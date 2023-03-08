import { Stack } from '@mui/system'
import React from 'react'
import Checkout from './checkout/Checkout'

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function CreateJobPost() {
  return (
    <Stack
      sx={{
        p: "40px",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
      justifyContent="center"
      alignItems={"center"}
      spacing={0}
    >
      <Checkout />
    </Stack>
    
  )
}

export default CreateJobPost