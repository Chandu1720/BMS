const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPerson: String,
  phone: String,
  email: String,
  address: String,
  gstId: String,
  notes: String,
}, { timestamps: true });

// Pre-save hook to generate the custom supplier ID
supplierSchema.pre('save', async function (next) {
  if (this.isNew) {
    const namePrefix = this.name.substring(0, 3).toUpperCase();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    let baseId = `${namePrefix}${dateStr}`;
    let counter = 0;
    let uniqueId = baseId;

    // Ensure the generated ID is unique
    while (await mongoose.models.Supplier.findOne({ supplierId: uniqueId })) {
      counter++;
      uniqueId = `${baseId}-${counter}`;
    }
    
    this.supplierId = uniqueId;
  }
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
