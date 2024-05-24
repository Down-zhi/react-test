import React from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";

import { RootState } from "@/store";
import Event, { EVENT_TYPE } from "@/utils/event";
import ColorCatch from "./colorCatch";
import styles from "./index.less";

const Option = Select.Option;

const StyleStting = () => {
  const resumeStore = useSelector((store: RootState) => store.resume.present);
  const { content } = resumeStore;
  const { styleSetting } = content;

  const handleValuesChange = (key: string) => (value: string) => {
    Event.emit(EVENT_TYPE.RESUME_CONTENT_UPDATE, {
      ...content,
      styleSetting: {
        ...styleSetting,
        [key]: value,
      },
    });
  };

  return (
    <section className={styles["style-setting"]}>
      <div className={styles["title"]}>主题颜色</div>
      <ColorCatch value={styleSetting.themeColor} onChange={handleValuesChange("themeColor")} />

      <div className={styles["title"]}>字体大小</div>
      <Select
        value={styleSetting.fontSize}
        style={{ width: "100%" }}
        onChange={handleValuesChange("fontSize")}
      >
        <Option value={14}>14px</Option>
        <Option value={16}>16px</Option>
        <Option value={18}>18px</Option>
      </Select>

      <div className={styles["title"]}>字体颜色</div>
      <ColorCatch value={styleSetting.fontColor} onChange={handleValuesChange("fontColor")} />

      <div className={styles["title"]}>模块距离</div>
      <Select
        value={styleSetting.blockMargin}
        style={{ width: "100%" }}
        onChange={handleValuesChange("blockMargin")}
      >
        <Option value={5}>窄</Option>
        <Option value={10}>适中</Option>
        <Option value={15}>宽</Option>
      </Select>

      <div className={styles["title"]}> 页边距</div>
      <Select
        value={styleSetting.pageMargin}
        style={{ width: "100%" }}
        onChange={handleValuesChange("pageMargin")}
      >
        <Option value={10}>窄</Option>
        <Option value={20}>适中</Option>
        <Option value={30}>宽</Option>
      </Select>
    </section>
  );
};

export default StyleStting;
