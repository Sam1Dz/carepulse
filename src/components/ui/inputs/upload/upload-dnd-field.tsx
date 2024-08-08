'use client';

import React from 'react';

import { useDropzone } from 'react-dropzone';

/* MATERIAL UI */
import { ButtonBase, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/* MATERIAL UI | ICONS */
import FileUploadIcon from '@mui/icons-material/FileUpload';

/* COMPONENTS */
import Color from '@/components/theme/color-pallete';
import { StyledImage } from '@/components/theme';
import { VisuallyHiddenInputBase } from './hidden-input';

/* LIBRARIES */
import { ConvertFileToUrl } from '@/libs/utils';

const UploadArea = styled(ButtonBase)(({ theme }) => ({
  borderWidth: 1,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  borderStyle: 'dashed',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  borderColor:
    theme.palette.mode === 'dark'
      ? Color.neutral.white[200]
      : Color.neutral.black[300],
  ...theme.typography.body2,
}));

interface UploadDndFieldProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export default function UploadDndField({
  files,
  onChange,
}: UploadDndFieldProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Stack direction="column" gap={1}>
      <Typography>Foto/Scan Identitas *</Typography>
      <UploadArea {...getRootProps()}>
        <VisuallyHiddenInputBase
          {...getInputProps()}
          accept="image/png, image/jpeg, image/webp"
        />
        {files && files.length > 0 ? (
          <StyledImage
            alt="uploaded image"
            src={ConvertFileToUrl(files[0])}
            width={1000}
            height={1000}
            sx={{
              maxHeight: 400,
              overflow: 'hidden',
              objectFit: 'cover',
            }}
          />
        ) : (
          <React.Fragment>
            <FileUploadIcon
              sx={{
                p: 1,
                border: 1,
                borderRadius: '100%',
                borderStyle: 'solid',
                fontSize: 48,
              }}
            />

            <Stack
              gap={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">
                <Typography
                  component="span"
                  variant="body2"
                  color="primary.main"
                >
                  Klik untuk upload foto/scan
                </Typography>{' '}
                atau tarik ke sini
              </Typography>
              <Typography variant="body2">PNG, JPEG atau WebP</Typography>
            </Stack>
          </React.Fragment>
        )}
      </UploadArea>
    </Stack>
  );
}
