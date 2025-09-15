const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billId: {
    type: String,
    unique: true,
  },
  customerName: String,
  customerPhone: String,
  billDate: Date,
  items: [{
    name: String,
    quantity: Number,
    rate: Number,
    total: Number,
  }],
  grandTotal: Number,
  paymentStatus: String,
  paidAmount: { type: Number, default: 0 },
  paymentMode: String,
  notes: String,
  billCopy: String,
}, { timestamps: true });

// Pre-save hook to generate the custom bill ID
billSchema.pre('save', async function (next) {
  if (this.isNew) {
    const namePrefix = this.customerName.substring(0, 4).toUpperCase();
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateStr = `${month}${year}`;

    const count = await mongoose.models.Bill.countDocuments({
      billId: { $regex: `^${namePrefix}${dateStr}` },
    });

    this.billId = `${namePrefix}${dateStr}-${count + 1}`;
  }
  next();
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
