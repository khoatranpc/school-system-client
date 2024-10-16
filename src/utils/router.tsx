import { AreaChartOutlined, TeamOutlined } from "@ant-design/icons";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineBlock } from "react-icons/ai";
import { BsDatabaseGear } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { KeyTab, Role, Router } from "../types/interface";

export const getLinkByRoute: Record<Role, Record<KeyTab | any, string>> = {
    ADMIN: {
        [KeyTab.DASHBOARD]: '/admin/dash-board',
        [KeyTab.STUDENTS_LIST]: '/admin/students',
        [KeyTab.STUDENTS_DETAIL]: '/admin/students/detail',
        [KeyTab.STUDENTS_RANK]: '/admin/students/rank',
        [KeyTab.CLASSES]: '/admin/classes',
        [KeyTab.CLASS_LIST]: '/admin/classes',
        [KeyTab.DETAIL_CLASS]: '/admin/classes/detail',
        [KeyTab.TEACHERS]: '/admin/teachers',
        [KeyTab.DATA_BASE]: '/admin/common-database',
        [KeyTab.TEACHER_POSITIONS]: '/admin/common-database/teacher-positions',
    },
    STUDENT: {},
    TEACHER: {}
};
const routers: Record<Role, Router[]> = {
    ADMIN: [
        {
            active: true,
            key: KeyTab.DASHBOARD,
            label: 'Thống kê',
            link: getLinkByRoute['ADMIN'][KeyTab.DASHBOARD],
            icon: <AreaChartOutlined />
        },
        {
            active: false,
            key: KeyTab.GRADES,
            label: 'Khối lớp',
            link: getLinkByRoute['ADMIN'][KeyTab.GRADES],
            icon: <AiOutlineBlock />,
            isHidden: true
        },
        {
            key: KeyTab.CLASSES,
            active: true,
            label: 'Lớp học',
            link: getLinkByRoute['ADMIN'][KeyTab.CLASS_LIST],
            icon: <SiGoogleclassroom />,
            children: [
                {
                    active: true,
                    label: 'Danh sách',
                    key: KeyTab.CLASS_LIST,
                    link: getLinkByRoute['ADMIN'][KeyTab.CLASS_LIST],
                },
                {
                    active: true,
                    isHidden: true,
                    label: 'Chi tiết',
                    key: KeyTab.DETAIL_CLASS,
                    link: getLinkByRoute['ADMIN'][KeyTab.DETAIL_CLASS],
                }
            ]
        },
        {
            active: true,
            key: KeyTab.STUDENTS,
            label: 'Học sinh',
            icon: <TeamOutlined />,
            link: '',
            children: [
                {
                    active: true,
                    key: KeyTab.STUDENTS_LIST,
                    label: 'Danh sách',
                    link: getLinkByRoute['ADMIN'][KeyTab.STUDENTS_LIST]
                },
                {
                    active: true,
                    key: KeyTab.STUDENTS_DETAIL,
                    label: 'Chi tiết',
                    link: getLinkByRoute['ADMIN'][KeyTab.STUDENTS_DETAIL],
                    isHidden: true
                },
                {
                    active: true,
                    key: KeyTab.STUDENTS_RANK,
                    label: 'Xếp hạng',
                    link: getLinkByRoute['ADMIN'][KeyTab.STUDENTS_RANK]
                }
            ]
        },
        {
            key: KeyTab.TEACHERS,
            active: true,
            label: 'Giáo viên',
            link: getLinkByRoute['ADMIN'][KeyTab.TEACHERS],
            icon: <FaChalkboardTeacher />
        },
        {
            key: KeyTab.DATA_BASE,
            active: true,
            label: <div className="text-[var(--important)] font-bold">Dữ liệu</div>,
            link: '',
            icon: <BsDatabaseGear />,
            children: [
                {
                    key: KeyTab.TEACHER_POSITIONS,
                    active: true,
                    label: 'Vị trí công tác',
                    link: getLinkByRoute['ADMIN'][KeyTab.TEACHER_POSITIONS],
                }
            ]
        }
    ],
    TEACHER: [],
    STUDENT: [],
}

export default routers;