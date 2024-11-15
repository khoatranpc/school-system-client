import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, Modal, Popconfirm, Radio, Tooltip } from 'antd';
import { Obj } from '@/src/types/interface';
import saveHomeRoomTeacher from '@/src/store/reducers/savehomeroomteacher';
import { querySaveHomeroomTeacher } from '@/src/utils/operationGraphQl';

interface Props {
    refreshCallBack?: () => void;
}
const ModalHomeRoomTeacher = memo(forwardRef((props: Props, ref) => {
    const [modal, setModal] = useState(false);
    const savedRecordHomeRoomTeacher = saveHomeRoomTeacher.hook();
    const [crrHomeroomTeacher, setCrrHomeRoomeTeacher] = useState<Obj | undefined>({});
    const params = useSearchParams();
    const classId = params.get('classId');

    const handleModal = (open: boolean, currentHomeRoomTeacher?: Obj) => {
        setCrrHomeRoomeTeacher(currentHomeRoomTeacher);
        setModal(open);
    };
    useImperativeHandle(ref, () => {
        return {
            handleModal
        }
    });
    const handleUpdateRecordHomeRoomTeacher = (isDeleted?: boolean) => {
        const getRecordHomeroomTeacherId: string = crrHomeroomTeacher?.teacherId?._id as string;
        const payload = {
            teacherId: getRecordHomeroomTeacherId,
            schoolYearId: crrHomeroomTeacher?.schoolYearId?._id as string,
            classId: classId as string,
            isActive: crrHomeroomTeacher?.isActive,
            isDeleted: typeof isDeleted === 'boolean' ? !!isDeleted : crrHomeroomTeacher?.isDeleted
        };
        savedRecordHomeRoomTeacher.query({
            action: 'All',
            operationName: 'SaveHomeRoomTeacher',
            path: 'savehomeroomteacher',
            query: querySaveHomeroomTeacher,
            payload: payload
        }, (successful, message) => {
            if (successful) {
                toast('Cập nhật thông tin GVCN thành công', {
                    type: 'success'
                });
            } else {
                toast(`Cập nhật thông tin thất bại! ${message}`, {
                    type: 'error'
                });
            }
        });
    }

    useEffect(() => {
        if (savedRecordHomeRoomTeacher.data.successful || savedRecordHomeRoomTeacher.data.errors) {
            if (savedRecordHomeRoomTeacher.data.successful) {
                handleModal(false);
                props.refreshCallBack?.();
            }
            savedRecordHomeRoomTeacher.clear?.();
        }
    }, [savedRecordHomeRoomTeacher.data]);
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
            onOk={() => {
                handleUpdateRecordHomeRoomTeacher();
            }}
            okText="Lưu"
            confirmLoading={savedRecordHomeRoomTeacher.data.isLoading}
        >
            {
                modal &&
                <div className='crrHomeroomTeacher flex flex-col gap-[1.2rem] justify-between items-centers'>
                    <p className='flex items-center justify-between'>
                        <span>Giáo viên: <strong>{crrHomeroomTeacher?.teacherId?.userId?.name as string}</strong></span>
                        <Popconfirm
                            title="Xoá thông tin dữ liệu"
                            description="Xoá thông tin dữ liệu phân bổ GVCN?"
                            onConfirm={() => {
                                handleUpdateRecordHomeRoomTeacher(true);
                            }}
                        >
                            <Tooltip color='var(--base)' title="Xoá thông tin dữ liệu?">
                                <Button icon={<DeleteFilled className='text-red-600' />} />
                            </Tooltip>
                        </Popconfirm>
                    </p>
                    <div className='flex gap-[1.2rem]'>
                        <p>Trạng thái: </p>
                        <Radio.Group
                            optionType='button'
                            defaultValue={crrHomeroomTeacher?.isActive as boolean}
                            value={crrHomeroomTeacher?.isActive as boolean}
                            onChange={(e) => {
                                setCrrHomeRoomeTeacher({
                                    ...crrHomeroomTeacher,
                                    isActive: e.target.value
                                });
                            }}
                        >
                            <Radio value={true}>Đang làm việc</Radio>
                            <Radio value={false}>Ngưng làm việc</Radio>
                        </Radio.Group>
                    </div>
                </div>
            }
        </Modal>

    )
}));


export default ModalHomeRoomTeacher;