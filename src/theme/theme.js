import { createTheme } from "@mui/material/styles";

//MUI CUSTOM THEME
export const theme = createTheme({
  
  typography: {
    fontFamily: ["Cairo"],
  },

  components: {
    //checkbox
    MuiCheckbox: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "2rem",
          "&:hover": {
            backgroundColor: "transparent",
          }
        },
      },
    },

    //drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FCFCFC',
        },
      },
    },

    //Input textfield
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "white",
        },
      },
    },
    //select
    MuiSelect:{
        styleOverrides: {
            root: {
              color: '#9A9A9A',
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: '#9A9A9A',
                },
                "&:hover fieldset": {
                  border: `2px solid #F3F3F3`,
                },
                "&:focus fieldset": {
                  border: `2px solid #F3F3F3`,
                },
                "&.Mui-focused fieldset": {
                  border: `2px solid #F3F3F3`,
                },
    
                "& .MuiInputBase-input ": {
                  padding: "12px 10px",
                },
              },
            },
          },
    },

    //Textfield
    MuiTextField: {
      styleOverrides: {
        root: {
          color: '#9A9A9A',
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: '#9A9A9A',
            },
            "&:hover fieldset": {
              border: `2px solid #F3F3F3`,
            },
            "&:focus fieldset": {
              border: `2px solid #F3F3F3`,
            },
            "&.Mui-focused fieldset": {
              border: `2px solid #F3F3F3`,
            },

            "& .MuiInputBase-input ": {
              padding: "12px 10px",
            },
          },
        },
      },
    },

    MuiButton: {
      //BUTTONS VARIANTS
      variants: [
        //MJ_BUTTON_PRIMARY
        {
          props: { variant: "primary" },
          style: {
            fontWeight: "600",
            padding: "12px",
            transition: "ease all 0.5s",
            backgroundColor: '#3BB349',
            borderRadius: "0.5rem",
            color: "white",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: '#3BB36F',
              color: "white",
            },
            textTransform: "none",
            "&:disabled": { 
                backgroundColor: '#9A9A9A',
                color:'white'
             }
          },
        },
        {
            props: { variant: "secondary" },
            style: {
              fontWeight: "600",
              padding: "12px",
              transition: "ease all 0.5s",
              backgroundColor: '#9A9A9A',
              borderRadius: "0.5rem",
              color: "white",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: '#9A9AAF',
                color: "white",
              },
              textTransform: "none",
              "&:disabled": { 
                  backgroundColor: '#9A9A9A',
                  color:'white',
                  opacity:'0.5',
               }
            },
          },
      ],
    },
  },
});
