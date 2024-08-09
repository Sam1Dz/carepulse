'use client';

import React from 'react';

import { useDropzone } from 'react-dropzone';

/* MATERIAL UI */
import {
  Box,
  Stack,
  ButtonBase,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { alpha, styled } from '@mui/material/styles';

/* MATERIAL UI | ICONS */
import FileUploadIcon from '@mui/icons-material/FileUpload';

/* COMPONENTS */
import FormLabel from '../label';
import { StyledImage } from '@/components/theme';
import { VisuallyHiddenInputBase } from './hidden-input';

/* LIBRARIES */
import { ConvertFileToUrl } from '@/libs/utils';

const UploadArea = styled(ButtonBase)(({ theme }) => ({
  borderWidth: 1,
  width: '100%',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  alignItems: 'center',
  borderStyle: 'dashed',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
}));

interface UploadImageDndFieldProps {
  name: string;
  label: string;
  file: File | null;
  error?: boolean;
  disabled?: boolean;
  acceptFile?: string[];
  helperText?: React.ReactNode;
  helperAcceptFormat?: string;
  onChange: (file: File) => void;
}

export default function UploadImageDndField({
  acceptFile = ['image/*'],
  file,
  name,
  error,
  label,
  disabled,
  helperText,
  helperAcceptFormat,
  onChange,
}: UploadImageDndFieldProps) {
  const { enqueueSnackbar } = useSnackbar();

  /* Components Function */
  const onDrop = React.useCallback(
    (fileData: File[]) => {
      if (acceptFile[0] !== 'image/*') {
        if (acceptFile.find((accept) => accept === fileData[0].type)) {
          onChange(fileData[0]);
        } else {
          enqueueSnackbar('Gagal Upload', {
            variant: 'alert',
            severity: 'error',
            description: 'Ekstensi file yang diupload salah',
          });
        }

        return;
      }

      onChange(fileData[0]);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const RenderLabelDesc = () => (
    <React.Fragment>
      <FileUploadIcon
        sx={{
          p: 1,
          mb: 1,
          border: 1,
          fontSize: 48,
          borderRadius: '100%',
          borderStyle: 'solid',
        }}
      />

      <Stack
        gap={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2">
          <Typography component="span" variant="body2" color="primary.main">
            Klik untuk upload
          </Typography>
          &nbsp; atau tarik ke sini
        </Typography>
        {helperAcceptFormat && (
          <Typography variant="body2">{helperAcceptFormat}</Typography>
        )}
      </Stack>
    </React.Fragment>
  );
  const RenderContent = () => {
    if (isDragActive) {
      return (
        <Typography
          variant="body2"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Lepas gambar di sini
        </Typography>
      );
    }

    return (
      <React.Fragment>
        {file ? (
          <Box component="div" sx={{ position: 'relative' }}>
            <StyledImage
              alt="uploaded image"
              src={ConvertFileToUrl(file)}
              width={1000}
              height={1000}
              sx={{
                maxHeight: { xs: 200, sm: 300, md: 400 },
                objectFit: 'contain',
              }}
            />

            <Box
              component="div"
              sx={{
                top: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                transition: (theme) =>
                  `${theme.transitions.create(
                    ['background-color', 'transform'],
                    {
                      duration: theme.transitions.duration.enteringScreen,
                    },
                  )}`,
                '&:hover': {
                  bgcolor: (theme) =>
                    alpha(theme.palette.background.paper, 0.95),
                },
              }}
            >
              <Stack
                gap={1}
                component="div"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  opacity: 0,
                  height: '100%',
                  transition: (theme) =>
                    `${theme.transitions.create(['opacity', 'transform'], {
                      duration: theme.transitions.duration.enteringScreen,
                    })}`,
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <RenderLabelDesc />
              </Stack>
            </Box>
          </Box>
        ) : (
          <RenderLabelDesc />
        )}
      </React.Fragment>
    );
  };

  return (
    <Box component="div" sx={{ width: '100%' }}>
      <FormLabel error={error}>{label}</FormLabel>
      <UploadArea
        {...getRootProps()}
        disabled={disabled}
        sx={{
          mt: 1,
          minHeight: !file ? 200 : { xs: 200, sm: 300, md: 400 },
          p: !file ? 2 : 0,
          borderColor: (theme) =>
            !error ? theme.palette.text.primary : theme.palette.error.main,
        }}
      >
        <VisuallyHiddenInputBase
          {...getInputProps()}
          name={name}
          accept={acceptFile.toString()}
        />
        <RenderContent />
      </UploadArea>
      <FormHelperText error={error} sx={{ mx: 1.75 }}>
        {helperText}
      </FormHelperText>
    </Box>
  );
}
