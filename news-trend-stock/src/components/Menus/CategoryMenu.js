import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import setCategoryDataFunction from '../../pages/CategoryPage'

// Generate Order Data
function createData(id, volume) {

  return { id, volume};
}



export default function CategoryManu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCategoryDataFunction()
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Select Category
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {categories.map((row) => (
          <MenuItem onClick={handleClose}> {row.volume}</MenuItem>
          ))}

      </Menu>
    </div>
  );
}