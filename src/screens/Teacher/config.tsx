import { Button, Checkbox, Input, InputNumber } from "antd";
import { ColumnsType } from "antd/es/table";
import { BiTrash } from "react-icons/bi";
import { Obj } from "@/src/types/interface";
import { configHeaderCell } from "@/src/utils";
import DegreeSelect from "@/src/components/SelectDegree";

const columns: (degrees: Obj[], handle: (isAppend: boolean, indexRemove?: number, isReplace?: boolean, values?: Obj[]) => void) => ColumnsType = (degrees, handle) => {
    const handleChangeField = (field: string, index: number, value: string | number | boolean) => {
        degrees[index][field] = value;
        handle(false, undefined, true, degrees);
    };
    return [
        {
            title: 'Bậc',
            key: 'Degree',
            dataIndex: 'type',
            render(value, _, idx) {
                return <DegreeSelect
                    status={!value ? 'warning' : ''}
                    onChange={(val) => {
                        handleChangeField('type', idx, val);
                    }}
                />
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 'auto'
        },
        {
            title: 'Trường',
            key: 'School',
            dataIndex: 'school',
            render(value, _, idx) {
                return <Input status={!value ? 'warning' : ''} placeholder='Trường theo học' onChange={(e) => {
                    handleChangeField('school', idx, e.target.value);
                }} />
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 250
        },
        {
            title: 'Chuyên ngành',
            key: 'Major',
            dataIndex: 'major',
            render(value, _, idx) {
                return <Input status={!value ? 'warning' : ''} placeholder='Chuyên ngành' onChange={(e) => {
                    handleChangeField('major', idx, e.target.value);
                }} />
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 180
        },
        {
            title: 'Trạng thái',
            key: 'isGraduated',
            dataIndex: 'isGraduated',
            render(value, _, idx) {
                return <Checkbox checked={value} onChange={(e) => {
                    handleChangeField('isGraduated', idx, e.target.checked);
                }}>Hoàn thành</Checkbox>
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 170
        },
        {
            title: 'Tốt nghiệp',
            key: 'Year',
            dataIndex: 'year',
            render(value, _, idx) {
                return <InputNumber status={!value ? 'warning' : ''} className="w-[16rem]" placeholder="Năm/Dự kiến" defaultValue={value} onChange={(e) => {
                    handleChangeField('year', idx, e);
                }} />
            },
            onHeaderCell() {
                return configHeaderCell();
            },
        },
        {
            key: 'action',
            onHeaderCell() {
                return configHeaderCell();
            },
            render(_, __, idx) {
                return <Button icon={<BiTrash />} onClick={() => {
                    handle(false, idx);
                }}></Button>
            }
        }
    ];
};

const queryCreateTeacher = `#graphql
    mutation CreateTeacher($payload: CreateTeacherInput!){
        createTeacher(payload: $payload){
            _id
            isActive
            isDeleted
            userId {
                _id
            }
            teacherPositionsId {
                _id
            }
        }
    }
`;
const queryTeachers = `#graphql
query Teachers($payload: TeachersFilterInput){
    teachers(payload: $payload){
        data {
            _id
            isActive
            isDeleted
            startDate
            endDate
            code
            degrees {
                type
                school
                major
                year
                isGraduated
            }
            teacherPositionsId {
                _id
                name
                code
            }
            userId {
                _id
                name
                email
                phoneNumber
                role
                address
            }
        }
        limit
        page
        count
        totalPage
    }
}
`
export {
    columns,
    queryCreateTeacher,
    queryTeachers
}