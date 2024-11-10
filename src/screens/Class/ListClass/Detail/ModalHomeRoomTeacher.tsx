import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Radio, Tooltip } from 'antd';
import { Obj } from '@/src/types/interface';

const ModalHomeRoomTeacher = forwardRef((props, ref) => {
    const [modal, setModal] = useState(false);
    const [crrHomeroomTeacher, setCrrHomeRoomeTeacher] = useState<Obj | undefined>({});
    const handleModal = (open: boolean, currentHomeRoomTeacher?: Obj) => {
        setCrrHomeRoomeTeacher(currentHomeRoomTeacher);
        setModal(open);
    };
    useImperativeHandle(ref, () => {
        return {
            handleModal
        }
    });
    const handleDelete = () => {
        
    }
    return (
        <Modal
            open={modal}
            onClose={() => {
                handleModal(false);
            }}
            onCancel={() => {
                handleModal(false);
            }}
            centered
            title={"Cập nhật Thông tin"}
        >
            {
                modal &&
                <div className='crrHomeroomTeacher flex flex-col gap-[1.2rem] justify-between items-centers'>
                    <p className='flex items-center justify-between'>
                        <span>Giáo viên: <strong>{crrHomeroomTeacher?.teacherId?.userId?.name as string}</strong></span>
                        <Popconfirm
                            title="Xoá thông tin dữ liệu"
                            description="Xoá thông tin dữ liệu phân bổ GVCN?"
                        >
                            <Tooltip color='var(--base)' title="Xoá thông tin dữ liệu?">
                                <Button icon={<DeleteFilled className='text-red-600' />} />
                            </Tooltip>
                        </Popconfirm>
                    </p>
                    <div className='flex gap-[1.2rem]'>
                        <p>Trạng thái: </p>
                        <Radio.Group optionType='button' defaultValue={crrHomeroomTeacher?.isActive as boolean}>
                            <Radio value={true}>Đang làm việc</Radio>
                            <Radio value={false}>Ngưng làm việc</Radio>
                        </Radio.Group>
                    </div>
                </div>
            }
        </Modal>

    )
});

export default ModalHomeRoomTeacher;