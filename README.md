# Alien Numerals Converter

A modern Angular application that converts custom Alien Numerals to integers using subtractive notation rules.

## Features

- 🎯 **Real-time Validation**: Instant feedback on input validity
- 🎨 **Modern UI**: Beautiful, responsive design with Angular Material
- 📱 **Mobile Friendly**: Fully responsive layout that works on all devices
- ⚡ **Fast Conversion**: Efficient algorithm with loading states
- 🧪 **Well Tested**: Comprehensive unit tests for all conversion logic
- ♿ **Accessible**: WCAG compliant with keyboard navigation support

## Alien Numeral System

This application implements a custom numeral system with the following symbols:

| Symbol | Value |
|--------|-------|
| A      | 1     |
| B      | 5     |
| Z      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| R      | 1000  |

### Conversion Rules

1. **Basic Addition**: Values are added from left to right
2. **Subtractive Rules**: When a smaller value appears before a larger value, it is subtracted:
   - AB = 4 (B - A = 5 - 1)
   - AZ = 9 (Z - A = 10 - 1)
   - ZL = 40 (L - Z = 50 - 10)
   - ZC = 90 (C - Z = 100 - 10)
   - CD = 400 (D - C = 500 - 100)
   - CR = 900 (R - C = 1000 - 100)

### Examples

- `AAA` = 3 (1 + 1 + 1)
- `LBAAA` = 58 (50 + 5 + 1 + 1 + 1)
- `RCRZCAB` = 1994 (1000 + 900 + 90 + 4)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alien-numeral-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/alien`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── alien-converter/
│   │       ├── alien-converter.component.ts
│   │       ├── alien-converter.component.html
│   │       └── alien-converter.component.scss
│   ├── utils/
│   │   ├── alien-to-int.util.ts
│   │   └── alien-to-int.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── index.html
├── main.ts
└── styles.scss
```

## Component Architecture

### AlienConverterComponent

The main component that handles the conversion interface:

- **Form Management**: Reactive forms with real-time validation
- **State Management**: Loading states, error handling, and result display
- **User Experience**: Quick examples, keyboard shortcuts, and responsive design

### Utility Functions

- **`alienToInt(s: string): number`**: Core conversion function
- **`isValidAlienSymbol(char: string): boolean`**: Character validation
- **`isValidSubtractivePair(first: string, second: string): boolean`**: Pair validation

## Testing

The application includes comprehensive unit tests covering:

- ✅ Basic addition cases
- ✅ Subtractive rule cases
- ✅ Complex combinations
- ✅ Error handling (invalid characters, invalid pairs)
- ✅ Edge cases and boundary conditions
- ✅ Case insensitive input

Run tests with:
```bash
npm test
```

## Technology Stack

- **Angular 17**: Modern web framework
- **Angular Material**: UI component library
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Enhanced CSS with variables and mixins
- **Jasmine & Karma**: Testing framework
- **RxJS**: Reactive programming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- ARIA labels and descriptions

## Performance Features

- Lazy loading
- OnPush change detection
- Optimized bundle size
- Efficient re-rendering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Demo

Visit the live demo at: [Demo URL]

## Screenshots

### Desktop View
- Clean, modern interface with two-column layout
- Real-time validation and conversion
- Interactive symbol table
- Expandable rules section

### Mobile View
- Responsive single-column layout
- Touch-friendly interface
- Optimized for small screens
- Fast, smooth interactions

## Support

For questions or issues, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using Angular and Angular Material
