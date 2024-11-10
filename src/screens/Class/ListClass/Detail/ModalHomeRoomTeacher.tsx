import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, Input, Modal, Select, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@/src/utils/customHooks';

const ModalHomeRoomTeacher = forwardRef((props, ref) => {
    const [modal, setModal] = useState(false);
    const handleModal = (open: boolean) => {
        setModal(open);
    };
    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(searchValue, 3000);
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            teacherId: '',
            schoolYear: '',
            status: true,
        },
        onSubmit(values) {
            console.log(values);
        }
    });
    useImperativeHandle(ref, () => {
        return {
            handleModal
        }
    });
    useEffect(() => {
        console.log(debouncedValue);
    }, [debouncedValue]);
    return (
        <Modal
            open={modal}
            onClose={() => {
                handleModal(false);
            }}
            onCancel={() => {
                handleModal(false);
            }}
            title={"Cập nhật Giáo viên chủ nhiệm"}
        >
            <div className='formAddHoomroomTeacher'>
                <Form
                    layout='vertical'
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label={
                            <p className='flex items-center'>
                                Tìm kiếm giáo viên <sup>Chưa làm chủ nhiệm trong học kỳ hiện tại!</sup>
                            </p>
                        }
                        required
                        initialValue={searchValue}
                    >
                        <Select
                            suffixIcon={<SearchOutlined />}
                            showSearch
                            filterOption={false}
                            // notFoundContent={fetching ? <Spin size="small" /> : null}
                            onSearch={(value) => {
                                setSearchValue(value);
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                            value={searchValue}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>

    )
});

export default ModalHomeRoomTeacher;