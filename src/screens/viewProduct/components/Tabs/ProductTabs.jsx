import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import TabPanel from "./TabPanel";
import PropType from 'prop-types'

const ProductTabs = ({ sizes, designDetails }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `product-tab-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Size & Fit" {...a11yProps(0)} />
          <Tab label="Design details" {...a11yProps(1)} />
          <Tab label="Free Returns" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {sizes.map((item, i) => (
          <li style={{ marginBottom: 10 }} key={i}>
            {" "}
            {item}
          </li>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {designDetails.map((item, i) => (
          <li style={{ marginBottom: 10 }} key={i}>
            {item}
          </li>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="body2" lineHeight={2} >
          Subject to meeting the conditions set out in this Returns & Exchanges
          section, we offer a “no questions asked” free returns policy which
          allows you to return delivered items to us for any reason up to 30
          days from the delivery of your order, free of charge.
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default ProductTabs;

ProductTabs.propTypes = {
  sizes: PropType.array.isRequired,
  designDetails: PropType.array.isRequired,
};
