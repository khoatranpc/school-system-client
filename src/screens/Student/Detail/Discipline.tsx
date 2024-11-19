import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

// Kỷ luật
const Discipline = () => {
    return (
        <div className='discipline w-full'>
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Chuyên cần"
                            value={'Tốt'}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Học tập"
                            value={'Khá'}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Discipline;