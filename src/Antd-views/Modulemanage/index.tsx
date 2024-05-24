const ModuleManage = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState<boolean>(false);
    const resume = useSelector((state: RootState) => state.resume.present);
    const [form] = Form.useForm();
    const { content } = resume;
  
    //类似开关，blocks的展示与否
    const handleBlockSwitch = (type: string) => {
      return (checked: boolean) => {
        const blocks = content.blocks.map((item: any) => {
          if (item.blockType === type) {
            return { ...item, isShow: checked };
          }
          return item;
        });
        dispatch.resume.setter({
          content: {
            ...content,
            blocks,
          },
        });
      };
    };
  
    const handleModuleAdd = async () => {
      const [res, err] = await to(form.validateFields());
      if (!err) {
        const { blockName, blockInput } = res;
        // 创建新的block数据
        const newBlock = {
          blockType: `custom-${shortUUID.generate()}`,
          isShow: true,
          blockData: _.find(BLOCK_INPUT, (item) => item.key === blockInput)?.defaultValue,
          blockName,
          blockInput,
        };
        dispatch.resume.setter({
          content: {
            ...content,
            blocks: [...content.blocks, newBlock],
          },
        });
        setModalShow(false);
      }
    };
  
    return (
      <ul className={style["module-list"]}>
        {content.blocks.map((module: any) => (
          <li className={style["module-item"]} key={module.blockType}>
            <div>
              <Icon
                className={cx(
                  module.blockIcon,
                  css`
                    margin-right: 6px;
                  `
                )}
              />
              {module.blockName}
            </div>
            {module.isRequire ? (
              <Tag color="#343c49">必填</Tag>
            ) : (
              <Switch onChange={handleBlockSwitch(module.blockType)} checked={module.isShow} />
            )}
          </li>
        ))}
        <li className={style["module-item"]} style={{ justifyContent: "center" }}>
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setModalShow(true)}>
            自定义模块
          </Button>
        </li>
        <Modal
          title="新增模块"
          visible={modalShow}
          onOk={handleModuleAdd}
          onCancel={() => setModalShow(false)}
          okText="确定"
          cancelText="取消"
        >
          <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
            <Form.Item
              label="模块名称"
              name="blockName"
              rules={[{ required: true, message: "请输入模块名称" }]}
            >
              <Input allowClear placeholder="请输入模块名称" />
            </Form.Item>
  
            <Form.Item
              label="模块类型"
              name="blockInput"
              rules={[{ required: true, message: "请选择模块类型" }]}
            >
              <Select placeholder="请选择模块类型">
                {BLOCK_INPUT.map((item) => {
                  return <Select.Option value={item.key}>{item.name}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ul>
    );
  };