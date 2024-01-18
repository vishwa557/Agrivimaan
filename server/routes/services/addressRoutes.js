const express = require('express');
const router = express.Router();
const AddressService = require('../../services/services/addressService');

router.post('/', async (req, res) => {
  try {
    const newAddress = req.body;
    const createdAddress = await AddressService.createAddress(newAddress);
    res.status(201).json({ message: 'Address created successfully', createdAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new address' });
  }
});

router.get('/', async (req, res) => {
  try {
    const addresses = await AddressService.getAllAddresses();
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

router.get('/:addressId', async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const address = await AddressService.getAddressById(addressId);
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
    } else {
      res.status(200).json(address);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
});

router.delete('/:addressId', async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const result = await AddressService.deleteAddress(addressId);
    res.status(200).json({ message: 'Address deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the address' });
  }
});

router.put('/:addressId', async (req, res) => {
  const addressId = req.params.addressId;
  const updatedAddress = req.body;
  try {
    const result = await AddressService.updateAddress(addressId, updatedAddress);
    res.status(200).json({ message: 'Address updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the address' });
  }
});

module.exports = router;
