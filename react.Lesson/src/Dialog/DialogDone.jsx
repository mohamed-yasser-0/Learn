import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';

const defaultData = {
  studentName: 'أحمد سامي ضيا',
  courseName: 'رواية الإمام قالون عن نافع من طريق الشاطبية',
  coursePeriod: 'خلال شهر يوليو 2026',
  instructorName: 'أحمد خالد السطوي',
  academyName: 'أكاديمية إقرأ وارتق لتعليم القرآن وعلومه',
};

const CertificateDialog = ({ open, onClose, data = defaultData }) => {
  const certificateRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* أنماط الطباعة */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #certificate-print-area,
            #certificate-print-area * {
              visibility: visible;
            }
            #certificate-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* شريط الأدوات العلوي (مش بيظهر في الطباعة) */}
        <Box
          className="no-print"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'white',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            شهادة إتمام الكورس
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{ ml: 1, bgcolor: '#b8860b', '&:hover': { bgcolor: '#9a7209' } }}
            >
              طباعة الشهادة
            </Button>
            <IconButton onClick={onClose} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* محتوى الشهادة */}
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 1, md: 3 },
            overflow: 'auto',
          }}
        >
          <Box
            id="certificate-print-area"
            ref={certificateRef}
            sx={{
              width: '100%',
              maxWidth: 900,
              bgcolor: 'white',
              border: '12px solid #c9a227',
              borderRadius: 2,
              position: 'relative',
              p: { xs: 3, md: 5 },
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              fontFamily: '"Amiri", "Traditional Arabic", serif',
              direction: 'rtl',
              textAlign: 'center',
            }}
          >
            {/* زخارف الزوايا */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 60,
                height: 60,
                borderTop: '3px solid #c9a227',
                borderRight: '3px solid #c9a227',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                width: 60,
                height: 60,
                borderTop: '3px solid #c9a227',
                borderLeft: '3px solid #c9a227',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                width: 60,
                height: 60,
                borderBottom: '3px solid #c9a227',
                borderRight: '3px solid #c9a227',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                width: 60,
                height: 60,
                borderBottom: '3px solid #c9a227',
                borderLeft: '3px solid #c9a227',
              }}
            />

            {/* العنوان */}
            <Typography
              variant="h3"
              sx={{
                color: '#b8860b',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '2rem', md: '2.8rem' },
                letterSpacing: 2,
              }}
            >
              شهادة تقدير
            </Typography>

            {/* خط زخرفي */}
            <Box
              sx={{
                width: 180,
                height: 3,
                bgcolor: '#c9a227',
                mx: 'auto',
                mb: 3,
                borderRadius: 2,
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#c9a227',
                },
                '&::before': { left: -15 },
                '&::after': { right: -15 },
              }}
            />

            {/* نص الشهادة */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: '#333', lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.2rem' } }}
            >
              تشهد {data.academyName} بأن الطالب
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: '#b8860b',
                fontWeight: 700,
                my: 2,
                fontSize: { xs: '1.6rem', md: '2.2rem' },
              }}
            >
              {data.studentName}
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 1, color: '#333', lineHeight: 1.9, fontSize: { xs: '0.95rem', md: '1.15rem' } }}
            >
              قد حضر وشارك في دورة {data.courseName}
              <br />
              التي قد أقيمت {data.coursePeriod} وتعطى له هذه الشهادة
              <br />
              تقديراً لجهوده ومشاركته المثمرة
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2, mb: 4, color: '#555', fontStyle: 'italic' }}
            >
              مع خالص الود والتقدير
            </Typography>

            {/* التوقيع والختم */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 4,
                px: { xs: 1, md: 4 },
              }}
            >
              {/* المحاضر */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: '#b8860b', fontWeight: 600, mb: 1 }}>
                  المحاضر والمعلم
                </Typography>
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 700 }}>
                  {data.instructorName}
                </Typography>
              </Box>

              {/* الختم */}
              <Box
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: '50%',
                  border: '3px solid #1a5f7a',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'rgba(26, 95, 122, 0.05)',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: '#1a5f7a', fontWeight: 700, fontSize: '0.7rem', lineHeight: 1.3 }}
                >
                  أكاديمية إقرأ
                  <br />
                  وارتق
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 30,
                    border: '2px solid #1a5f7a',
                    borderRadius: 1,
                    mt: 0.5,
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '0.6rem', color: '#1a5f7a' }}>📖</Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#1a5f7a', fontSize: '0.55rem', fontWeight: 600 }}
                >
                  الإلكترونية للعلوم القرآنية
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificateDialog;