import React, { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";

interface IStatisticsData {
    userCount: number;
    downloadTotal: number;
    resumeCount: number;
    templateCount: number;
  }
  
  const DEFAULT_STATISTICS_DATA = { //默认的数据都是0
    userCount: 0,
    downloadTotal: 0,
    resumeCount: 0,
    templateCount: 0,
  };

  const Statistics =()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [StatisticsData, setStatisticsData] = useState<IStatisticsData>(DEFAULT_STATISTICS_DATA);

    const handleStatisticsData=async ()=>{

    }
  return (
    <section className={styles["statistics"]}>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="用户总量" value={StatisticsData.userCount} loading={loading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="总下载次数" value={StatisticsData.downloadTotal} loading={loading} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="简历总量" value={StatisticsData.resumeCount} loading={loading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="模版总量" value={StatisticsData.templateCount} loading={loading} />
          </Card>
        </Col>
      </Row>
    </section>
  );
  };