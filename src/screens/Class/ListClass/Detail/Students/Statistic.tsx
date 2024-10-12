import React from 'react';
import { Statistic } from 'antd';
import { PiStudentThin } from "react-icons/pi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { Card, Col, Row } from 'antd';
import './styles.scss';

const Statistics = () => {
    return (
        <div className='studentInClassStatistic'>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={true} className='h-full'>
                        <Statistic
                            className="h-full"
                            title="Số lượng"
                            valueStyle={{ color: '#3f8600' }}
                            valueRender={() => {
                                return <div className='flex items-center gap-[1.2rem]'>
                                    <PiStudentThin /> <span>28/30</span>
                                </div>
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true} className='h-full'>
                        <Statistic
                            className="h-full"
                            title="Giới tính"
                            precision={2}
                            valueRender={() => {
                                return <div className='flex items-center justify-between'>
                                    <p className='text-[#A7C6ED]'><FaMale /><span className='text-[#243d5b]'>10 Nam</span></p>
                                    <p className='text-[#F4C2D7]'><FaFemale /> <span className='text-[#934565]'>10 Nữ</span></p>
                                </div>
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true} className='h-full'>
                        <Statistic
                            className="h-full"
                            title={<div>
                                <span>Học lực</span>
                            </div>}
                            valueRender={() => {
                                return <div className="performance">
                                    <div className='flex justify-between'>
                                        <div className="div1 text-[#4CAF50]">5 <span className='text-[1.4rem] font-semibold'>Giỏi</span></div>
                                        <div className="div2 text-[#FFC107]">10 <span className='text-[1.4rem] font-semibold'>Khá</span></div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="div3 text-[#FF9800]">7 <span className='text-[1.4rem] font-semibold'>Trung bình</span></div>
                                        <div className="div4 text-[#F44336]">2 <span className='text-[1.4rem] font-semibold'>Yếu</span></div>
                                    </div>
                                </div>
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={true} className='h-full'>
                        <Statistic
                            className="h-full"
                            title="Điểm trung bình"
                            valueRender={() => {
                                return <div className='flex items-center justify-between'>
                                    <p>7.8</p>
                                </div>
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Statistics;