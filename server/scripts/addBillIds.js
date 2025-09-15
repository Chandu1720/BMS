const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Bill = require('../models/Bill');

const MONGO_URI = process.env.MONGO_URI;

const addBillIds = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for script');

    const billsToUpdate = await Bill.find({ billId: { $exists: false } });

    if (billsToUpdate.length === 0) {
      console.log('All bills already have a billId.');
      return;
    }

    console.log(`Found ${billsToUpdate.length} bills to update.`);

    for (const bill of billsToUpdate) {
      const namePrefix = bill.customerName.substring(0, 3).toUpperCase();
      const date = bill.createdAt || new Date(); // Use existing creation date if available
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}${month}${day}`;

      let baseId = `${namePrefix}${dateStr}`;
      let counter = 0;
      let uniqueId = baseId;

      while (await mongoose.models.Bill.findOne({ billId: uniqueId })) {
        counter++;
        uniqueId = `${baseId}-${counter}`;
      }
      
      bill.billId = uniqueId;
      await bill.save();
      console.log(`Updated bill ${bill._id} with billId: ${uniqueId}`);
    }

    console.log('Finished updating bills.');

  } catch (error) {
    console.error('Error updating bills:', error);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

addBillIds();
