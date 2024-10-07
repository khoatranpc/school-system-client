import { AreaChartOutlined, TeamOutlined } from "@ant-design/icons";
import { SiGoogleclassroom } from "react-icons/si";
import { KeyTab, Role, Router } from "../types/interface";

export const getLinkByRoute: Record<Role, Record<KeyTab | any, string>> = {
    ADMIN: {
        [KeyTab.DASHBOARD]: '/admin/dash-board',
        [KeyTab.STUDENTS_LIST]: '/admin/students',
        [KeyTab.STUDENTS_DETAIL]: '/admin/students/detail',
        [KeyTab.STUDENTS_RANK]: '/admin/students/rank',
        [KeyTab.CLASSES]: '/admin/classes'
    },
    STUDENT: {},
    TEACHER: {}
}
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
            key: KeyTab.CLASSES,
            active: true,
            label: 'Lớp học',
            link: getLinkByRoute['ADMIN'][KeyTab.CLASSES],
            icon: <SiGoogleclassroom />
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
        }
    ],
    TEACHER: [],
    STUDENT: [],
}

export default routers;