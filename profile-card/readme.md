# Profile Card (with Animations) (HTML/CSS) 🪪

![Demo](assets/video.gif)

An animated profile card with dynamic text and glowing borders built using **HTML and CSS** to enhance my front-end development skills.

🖥️ [Live preview](https://soviji13.github.io/Learn-FrontEnd-with-me/profile-card/) **here!**

⚡️ **Download the latest version** via this [`.zip`](https://github.com/Soviji13/Learn-FrontEnd-with-me/raw/refs/heads/main/profile-card/profile-card.zip)!

>🤠 **No major updates or features** are planned for now — only minor improvements might be committed occasionally.

> 👍 Make sure to use an extension in your code editor (like Live Server) —or any other method— to run the app properly (always from `index.html`). All scripts must be in the same folder as `index.html` if you don’t want to tweak anything!

> 🇪🇸 All **code comments are written in Spanish**, since it's my native language. If you have any questions, feel free to send me an email!

🧑‍🏫 **In this README you'll learn:**

- ⚙️ The **inner workings of each script** (see the *Project Structure* section). For a deeper understanding, check out the code comments.

- ⚠️ **Key CSS concepts** (covered in *Technical Concepts Learned*). If some comments are unclear, there are examples and video links to help you out.

>📝 **All code and this README are commented as clearly as possible** with the goal of making everything easy to follow - both visually and logically (including the math behind it).

---
## 🚀 Useful Features

- ✅ **Animations using `@keyframes`**: Fluid animations applied to each element.
- ✅ **Explorer-Friendly**: Tricks and properties to ensure compatibility with major browsers.
- ✅ **Glow Effect**: Smooth glowing animation.
- ✅ **Responsive Design**: Looks good on any resolution.

> ❗️ Some improvements are still pending for very narrow screen sizes, especially in horizontal layouts.

---

## 📁 Project Structure

### `🟠 index.html`
Main card structure:
- **`#card-container`**: Main container of the card, necessary for compatibility with major browsers.
- **`#card`**: Contains the profile photo, username, and other information (you can add more content).

### `🔵 style.css`
Visual style and layout:
- **Reset CSS and basic styles**: Removes default padding and margin values for all elements, sets up the root font, and adds basic styles (e.g., for `h2` and `body`).
- **Animated text**: `h1` has an animated background visible only within the text.
- **Card style**: Background, animated border (using `::before` and `::after`), and width.
- **Card-container**: Ensures proper functionality across browsers. Contains an invisible conic-gradient animation.
- **Profile photo**: Rounded borders to create a circular shape and shadow effects.

---

## 🎯 Technical Concepts Learned

### ⤴️ Main Difference Between `::before` and `::after`

They are **pseudo-elements** used to add visual elements before or after the content of an element.

> They behave like child elements regarding positioning, relative to the element they are applied to.

They are not visible in HTML, but conceptually they function as:

```html
<!-- This is not actually rendered, just for illustration purposes! -->

<!-- The only visible part is <div class="card">content of card</div> -->
<div class="card">
    <!-- This is not seen in .html, but this would be its function, 
    where ::before or ::after are applied -->
    <div class="card::before">content before the content of .card</div> 

    <!-- More content ... Content of card - VISIBLE -->

     <div class="card::after">content after the content of .card</div> 
</div>
```
**✅ Benefits?** Simplifies code and HTML structure.

### 😴 Negative Z-Index

- Applied to **elements inside a container** that you want to position **below it**.
- You can overlap them using different levels such as `-1, -2, -3, ...`.

```css
/* Card background */
.fondo-card
{   
    /* Positioned below the profile photo, username, and all data from .card */
    z-index: -1;
}

/* Border */
.card::after, .card::before
{
    /* Positioned below the card background */
    z-index: -2;
}
```

> Code comments explain why this approach was necessary.

### 🌌 Animation with `@keyframes`

- To apply `@keyframes`, **add the following to the element you want to animate:** `animation: <duration> <animation name> <type> <additional options>`.

```css
/* Syntax for declaring an animation */
@keyframes <animation name>
{
    from{
        /* Initial animation <value(s)> */
    }
    to{
        /* Final animation <value(s)> */
    }
}
```

> 👉 I recommend this [link](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) to **understand this concept and explore different types of animations**.

### 📊 `@property`

- Acts like a variable but is **more focused on animations**.

```css
/* Syntax for declaring a @property */
@property --<variable name>
{
    syntax: "<format>";   /* Like color, angle, etc. */
    inherits: <true or false>;
    initial-value: <initial value of the property>;
}
```
> 🧏 **Variables are better suited for static values or for changing values via JS** for purposes like theme changes. You can declare them using **`--<variable name>: <value>`**. These are known as *custom properties*.

---

## 📚 Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Flexbox, pseudo-elements, gradients, transformations, and animations.