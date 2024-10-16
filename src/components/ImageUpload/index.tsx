import { Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from "react";
import { Image, Upload, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import ImgCrop from "antd-img-crop";
import UploadUI from "../UploadUI";

const ImageUpload = memo(({ fileList, setFileList }: { fileList: UploadFile<any>[], setFileList: Dispatch<SetStateAction<any>>, }) => {
    const getDefaultImgSrc = useMemo(() => {
        const getRandom = Math.round(Math.random() * 10);
        const getImgSrc = getRandom % 2 == 0 ? '/teachermale.avif' : '/teacherfemale.avif';
        return getImgSrc;
    }, []);
    const [imgSrc, setImgSrc] = useState(getDefaultImgSrc);
    const onChange: UploadProps['onChange'] = useCallback((info: UploadChangeParam<UploadFile<any>>) => {
        const getFile = info.fileList[0]?.originFileObj;
        if (getFile) {
            const _URL = window.URL || window.webkitURL;
            const url = _URL.createObjectURL(getFile);
            setImgSrc(url);
        } else {
            setImgSrc('');
        }
        setFileList(info.fileList);
    }, []);
    return (
        <>
            <Image
                alt="avatar"
                src={imgSrc}
                className="rounded-lg max-w-[20rem]"
            />
            <ImgCrop minZoom={0.5}>
                <Upload
                    showUploadList={false}
                    fileList={fileList}
                    onChange={onChange}
                    maxCount={1}
                    multiple={false}
                >
                    <UploadUI text={<p className='text-[1.4rem] font-semibold'>Chọn ảnh</p>} />
                </Upload>
            </ImgCrop>
        </>
    );
});
export default ImageUpload;