import React, {
  ChangeEvent,
  DragEvent,
  FC,
  ReactNode,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';

import styles from './FileUploader.module.scss';
import {
  Tooltip,
  TooltipSize,
  TooltipType,
} from 'src/components/Tooltip/Tooltip';

export interface FileUploaderProps {
  uploaderRef?: any;
  multiple?: boolean;
  onUpload: (files: FileList) => void;
  customRender?: ReactNode;
  disabled?: boolean;
  hint?: string;
}

export const FileUploader: FC<FileUploaderProps> = ({
  uploaderRef,
  multiple,
  onUpload,
  customRender,
  disabled,
  hint,
}) => {
  const refUniqueId = useRef<number>(Math.random());

  const [highlighted, setHighlighted] = useState<boolean>(false);

  const toogleHighlighted = () => setHighlighted(!highlighted);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!highlighted) {
      toogleHighlighted();
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (highlighted) {
      toogleHighlighted();
    }
  };

  const handleSelectFiles = (
    e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (highlighted) {
      toogleHighlighted();
    }

    const files =
      e.type === 'drop'
        ? (e as DragEvent).dataTransfer?.files
        : (e as ChangeEvent<HTMLInputElement>).target.files;

    if (files && files.length) {
      onUpload(files);
    }
  };

  const nullReturn = () => null;

  return (
    <>
      <div
        className={cx(styles.FileUploader, {
          [styles.Highlighted]: highlighted,
        })}
        onDrop={disabled ? nullReturn : handleSelectFiles}
        onDragOver={disabled ? nullReturn : handleDragOver}
        onDragLeave={disabled ? nullReturn : handleDragLeave}
      >
        <Tooltip
          title={hint}
          type={TooltipType.Default}
          size={TooltipSize.Small}
        >
          <label
            htmlFor={`file_picker_${refUniqueId.current}`}
            className={styles.FileUploaderButton}
          >
            {customRender
              ? customRender
              : 'Click or drag file to this area to upload'}
          </label>
          <input
            ref={uploaderRef}
            id={`file_picker_${refUniqueId.current}`}
            type="file"
            multiple={multiple}
            style={{ display: 'none' }}
            onChange={handleSelectFiles}
            disabled={disabled}
          />
        </Tooltip>
      </div>
    </>
  );
};
