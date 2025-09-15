const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    unique: true,
  },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  invoiceDate: Date,
  dueDate: Date,
  amount: Number,
  paymentStatus: String,
  paidAmount: { type: Number, default: 0 },
  paymentMode: String,
  notes: String,
  invoiceCopy: String,
});

invoiceSchema.pre('save', async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateStr = `${month}${year}`;

    const count = await mongoose.models.Invoice.countDocuments({
      invoiceId: { $regex: `^INV${dateStr}` },
    });

    this.invoiceId = `INV${dateStr}-${count + 1}`;
  }
  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;