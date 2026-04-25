import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, 'Original name is required'],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
      min: [0, 'File size must be positive'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
    },
    path: {
      type: String,
      required: [true, 'File path is required'],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional: Add when authentication is implemented
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    isPublic: {
      type: Boolean,
      default: true,
    },
    downloads: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes for better query performance
fileSchema.index({ originalName: 'text' })
fileSchema.index({ mimeType: 1 })
fileSchema.index({ createdAt: -1 })
fileSchema.index({ uploadedBy: 1 })

// Virtual for uploadedAt (alias for createdAt)
fileSchema.virtual('uploadedAt').get(function () {
  return this.createdAt
})

// Method to increment download count
fileSchema.methods.incrementDownloads = async function () {
  this.downloads += 1
  await this.save()
}

// Static method to get file statistics
fileSchema.statics.getStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalFiles: { $sum: 1 },
        totalSize: { $sum: '$size' },
        avgSize: { $avg: '$size' },
        totalDownloads: { $sum: '$downloads' },
      },
    },
  ])

  return stats[0] || {
    totalFiles: 0,
    totalSize: 0,
    avgSize: 0,
    totalDownloads: 0,
  }
}

// Static method to get files by type
fileSchema.statics.getFilesByType = async function () {
  return this.aggregate([
    {
      $group: {
        _id: '$mimeType',
        count: { $sum: 1 },
        totalSize: { $sum: '$size' },
      },
    },
    {
      $sort: { count: -1 },
    },
  ])
}

const File = mongoose.model('File', fileSchema)

export default File

