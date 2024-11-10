import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Drawer } from 'antd';
import PickTeacher from '@/src/components/PickTeacher';

const DrawerPickTeacher = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const handleDrawer = (open: boolean) => {
        setOpen(open);
    }
    useImperativeHandle(ref, () => {
        return {
            handleDrawer
        }
    });
    return (
        <Drawer
            title="Lựa chọn GVCN"
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            width={'90vw'}
        >
            {open && <PickTeacher />}
        </Drawer>
    )
});
export default DrawerPickTeacher;