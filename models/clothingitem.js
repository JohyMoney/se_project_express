imageUrl: {
  type: String,
  validate: {
    validator: function(value) {
      return validator.isURL(value);
    },
    message: 'You must enter a valid URL',
  },
},