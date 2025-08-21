# Food Adulteration Awareness Website

A comprehensive, responsive website designed to educate users about food adulteration, its health hazards, detection methods, and preventive measures. The website features an interactive quiz and FAQ section to enhance user engagement and learning.

## 🌟 Features

### 📱 Responsive Design
- Fully responsive layout that works on desktop, tablet, and mobile devices
- Mobile-first approach with touch-friendly interface
- Smooth animations and transitions

### 📚 Educational Content
- **Introduction Section**: Explains what food adulteration is with statistics
- **Health Hazards**: Detailed information about various health risks
- **Detection Methods**: Practical ways to identify adulterated food
- **Preventive Measures**: Tips to avoid consuming adulterated products

### 🎯 Interactive Elements
- **Interactive Quiz**: 5-question quiz with detailed explanations
- **FAQ Section**: Expandable questions and answers
- **Progress Tracking**: Visual progress indicator for quiz
- **Detailed Results**: Comprehensive feedback after quiz completion

### 🎨 Modern UI/UX
- Clean, professional design with green color scheme
- Smooth scrolling navigation
- Hover effects and animations
- Font Awesome icons for visual appeal

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website will load immediately with all functionality

### File Structure
```
food-adulteration-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 📖 How to Use

### Navigation
- Use the fixed navigation bar at the top to jump to different sections
- On mobile devices, tap the hamburger menu to access navigation
- Smooth scrolling automatically takes you to the selected section

### Quiz Section
1. Click "Start Quiz" to begin
2. Read each question carefully
3. Select your answer by clicking on an option
4. Use "Previous" and "Next" buttons to navigate
5. Complete all questions to see your results
6. Review detailed explanations for each question
7. Click "Take Quiz Again" to retry

### FAQ Section
- Click on any question to expand and see the answer
- Only one FAQ item can be open at a time
- Click again or click another question to close/open different items

### Mobile Features
- Swipe left/right in the quiz to navigate between questions
- Touch-friendly buttons and interactive elements
- Responsive design adapts to different screen sizes

## 🎨 Design Features

### Color Scheme
- **Primary Green**: #4CAF50 (represents safety and health)
- **Dark Green**: #2c5530 (for headings and emphasis)
- **Light Background**: #f8f9fa (for content sections)
- **Gradient**: Purple to blue gradient for hero section

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Font sizes adjust for different screen sizes

### Animations
- Smooth hover effects on cards and buttons
- Intersection Observer for scroll-triggered animations
- Floating animation for hero section icon
- Progress bar animation in quiz

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized images and icons
- Efficient CSS animations
- Minimal JavaScript footprint
- Fast loading times

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

### Mobile-Specific Features
- Collapsible navigation menu
- Touch-friendly quiz interface
- Swipe gestures for quiz navigation
- Optimized typography and spacing

## 🎯 Quiz Content

The interactive quiz includes questions about:
1. Common milk adulteration methods
2. Honey adulteration detection
3. Health risks of adulterated oils
4. Home testing methods for starch
5. Food items commonly adulterated with colors

Each question includes:
- Multiple choice options
- Detailed explanations
- Educational feedback

## 🔍 Accessibility Features

- **Keyboard Navigation**: Full keyboard support for quiz
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: High contrast ratios for readability
- **Alternative Text**: Descriptive text for visual elements

## 📈 Educational Impact

The website aims to:
- Raise awareness about food adulteration
- Provide practical detection methods
- Educate about health risks
- Encourage preventive measures
- Test knowledge through interactive quiz

## 🛠️ Customization

### Adding More Quiz Questions
Edit the `quizData` array in `script.js`:
```javascript
{
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0, // Index of correct answer (0-3)
    explanation: "Detailed explanation of the answer"
}
```

### Changing Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #2c5530;
    --background-color: #f8f9fa;
}
```

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style the section in `styles.css`
3. Add navigation link if needed

## 📞 Support

For questions or issues:
- Check browser compatibility
- Ensure JavaScript is enabled
- Try refreshing the page
- Clear browser cache if needed

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Food safety organizations for educational content
- Web development community for best practices

---

**Note**: This website is for educational purposes only. For actual food safety concerns, please contact your local food safety authorities.

