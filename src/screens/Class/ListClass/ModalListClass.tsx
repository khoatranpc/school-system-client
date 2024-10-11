import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Col, Modal, Row, Tabs, TabsProps } from 'antd';
import { Obj } from '@/src/types/interface';
import gradeLevels from '@/src/store/reducers/gradeLevels';
import classes from '@/src/store/reducers/classes';
import { uuid } from '@/src/utils';
import { queryClasses, queryCreateListClass } from './config';
import { queryGradeLevels } from '@/src/components/SelectGradeLevel/config';
import SelectSchoolYear from '@/src/components/SelectSchoolYear';
import Loading from '@/src/components/Loading';
import createListClass from '@/src/store/reducers/createListClass';
import { toast } from 'react-toastify';

interface ItemListClassProps {
    gradeLevelId?: string;
    crrSchoolYearId?: string;
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").slice(0, 12);
const checkboxOptions = letters.flatMap((letter) => [
    letter,
    `${letter}1`,
    `${letter}2`,
    `${letter}3`
]);
let getSelectedClasses: Obj[] = [];
const ItemListClass = (props: ItemListClassProps) => {
    const listClass = classes.hook();
    const getListClass = props.crrSchoolYearId ? (listClass.data.data?.classes?.data as Obj[] ?? []) : [];
    const [selectClasses, setSelectClasses] = useState<any[]>([]);
    const valuesChecked = selectClasses.filter(slc => (!slc.isDeleted && slc.isActive)).map((slc) => slc.name);
    const listGradeLevel = gradeLevels.hook();
    const crrGradeLevelSelected = (listGradeLevel.data.data?.gradeLevels as Obj[])?.find((item) => item._id === props.gradeLevelId);
    const componentId = useRef(uuid());
    useEffect(() => {
        if (props.crrSchoolYearId && props.gradeLevelId) {
            listClass.query({
                query: queryClasses,
                "operationName": "Classes",
                "path": "classes",
                "action": "Read",
                payload: {
                    schoolYearId: props.crrSchoolYearId,
                    gradeLevelId: props.gradeLevelId
                },
                componentId: componentId.current
            });
        }
    }, [props.crrSchoolYearId, props.gradeLevelId]);
    useEffect(() => {
        if (listClass.data.successful) {
            setSelectClasses([...getListClass]);
        }
        return () => {
            setSelectClasses([]);
        }
    }, [listClass.data]);
    useEffect(() => {
        getSelectedClasses = selectClasses;
    }, [selectClasses]);
    return <div>
        {props.gradeLevelId && <Checkbox.Group
            disabled={listClass.data.isLoading || !props.crrSchoolYearId}
            value={valuesChecked}
        >
            <Row gutter={[16, 16]}>
                {checkboxOptions.map((option, index) => {
                    const className = `${crrGradeLevelSelected?.level ?? ''}${option}`;
                    const idxCrrClass = selectClasses.findIndex(item => {
                        return item.name === className;
                    });
                    return <Col span={4} key={index}>
                        <Checkbox
                            value={className}
                            onClick={(e) => {
                                const idxChange = getListClass.findIndex(item => {
                                    return item.name === className;
                                });
                                const getStatusCheck = (e.currentTarget as any).checked as boolean;
                                if (idxChange > -1) {
                                    selectClasses[idxChange] = {
                                        ...selectClasses[idxChange],
                                        isDeleted: !getStatusCheck,
                                        isActive: getStatusCheck
                                    };
                                    setSelectClasses([...selectClasses]);
                                    return;
                                } else {
                                    if (idxCrrClass > -1) {
                                        selectClasses.splice(idxCrrClass, 1);
                                    } else {
                                        const newClass = {
                                            name: className,
                                            gradeLevelId: props.gradeLevelId,
                                            schoolYearId: props.crrSchoolYearId,
                                            isDeleted: false,
                                            isActive: true
                                        };
                                        selectClasses.push(newClass);
                                    }
                                }
                                setSelectClasses([...selectClasses]);
                            }}
                        >
                            {option}
                        </Checkbox>
                    </Col>
                })}
            </Row>
        </Checkbox.Group>
        }
    </div >
}
interface ModalProps {
    open: boolean;
    onClose: () => void;
}

const ModalListClass = (props: ModalProps) => {
    const listGradeLevel = gradeLevels.hook();
    const listClass = classes.hook();
    const getListClass = listClass.data.data?.classes?.data as Obj[] ?? [];
    const cListClass = createListClass.hook();
    const [gradeLeveltab, setGradeLevelTab] = useState('');
    const [crrSchoolYearId, setCrrSchoolYearId] = useState<string>('');
    const tabGradeLevels: TabsProps['items'] = (listGradeLevel.data.data?.gradeLevels as Obj[] ?? []).map((item) => {
        return {
            key: item._id,
            label: item.name,
            disabled: listClass.data.isLoading
        }
    });
    const handleSubmitCreateListClass = () => {
        cListClass.query({
            query: queryCreateListClass,
            "operationName": "CreateLisrtClass",
            "path": "createListClass",
            "action": "Create",
            "payload": {
                "classes": getSelectedClasses
            }
        });
    }
    useEffect(() => {
        if (cListClass.data.successful) {
            toast("Lưu thông tin lớp học thành công!", {
                type: 'success'
            });
            cListClass.clear?.();
        }
        if (cListClass.data.errors) {
            toast(`Lưu thông tin lớp học thất bại! ${cListClass.data.errors}`, {
                type: 'error'
            });
            cListClass.clear?.();
        }
    }, [cListClass.data]);
    useEffect(() => {
        if (!listGradeLevel.data.data && !listGradeLevel.data.isLoading) {
            listGradeLevel.query({
                query: queryGradeLevels,
                action: 'Read',
                operationName: 'GradeLevels',
                path: 'gradeLevels',
            });
        }
        if (listGradeLevel.data.successful) {
            setGradeLevelTab(tabGradeLevels[0]?.key ?? "");
        }
    }, [listGradeLevel.data]);
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            onCancel={props.onClose}
            wrapClassName='modalCreateListClass'
            title={"Tạo thông tin lớp học"}
            okText="Lưu"
            cancelText="Huỷ"
            okButtonProps={{
                disabled: listClass.data.isLoading
            }}
            cancelButtonProps={{
                disabled: listClass.data.isLoading
            }}
            onOk={() => {
                handleSubmitCreateListClass();
            }}
        >
            {props.open && <div className='saveListClass'>
                <div className="fnc flex justify-between">
                    <SelectSchoolYear
                        onChange={(value) => {
                            setCrrSchoolYearId(value);
                        }}
                    />
                    <p className='text-[var(--base)]'>Hãy chọn năm học và khối lớp để xem thông tin</p>
                </div>
                <div className='listClass'>
                    {listGradeLevel.data.isLoading ? <Loading /> : <Tabs
                        activeKey={gradeLeveltab}
                        items={tabGradeLevels}
                        onChange={(key) => {
                            setGradeLevelTab(key);
                        }}
                    />}
                    <ItemListClass
                        crrSchoolYearId={crrSchoolYearId}
                        gradeLevelId={gradeLeveltab}
                    />
                </div>
            </div>}
        </Modal>
    )
}

export default ModalListClass;