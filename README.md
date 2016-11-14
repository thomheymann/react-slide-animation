# React Slide Animation

Slide animation for React. Useful to animate items in a list. 


## Installation

```
npm install --save react-slide-animation
```


## Usage

```JavaScript
import SlideAnimation from 'react-slide-animation';

const List = ({ items }) => (
    <SlideAnimation component="ul">
        {items.map(({ id, name }) => <li key={id}>{name}</li>)}
    </SlideAnimation>
);

export default List;
```


## Build

Import styles using [PostCSS Import Plugin](https://github.com/postcss/postcss-import) (e.g. in your `main.css`):

```CSS
@import "react-slide-animation";
```

Or manually add `react-slide-animation/lib/index.css` to your webpack entry config.


## Reference

* `children` - **Required.** Children that animate when added to or removed from `SlideAnimation`. 

    **You must provide the `key` attribute for all children of `SlideAnimation`.** This is how React determines which child has entered, left, or stayed.

* `component` - Component used for rendering. *(default: 'div')*

    Can be a string (DOM component) or any user defined component:

    ```
    <SlideAnimation component={CustomContainer}>
        {/* ... */}
    </SlideAnimation>
    ```

    Additional properties to `SlideAnimation` will become properties of the rendered component:

    ```
    <SlideAnimation className="example" style={{ border: '1px solid black' }}>
        {/* ... */}
    </SlideAnimation>
    ```

* `animationName` - Prefix used to construct CSS class names. *(default: 'slide-animation')*

    Can be used to create custom animation effects:

    - `{animationName}-enter` - Applied to entering child
    - `{animationName}-enter-active` - Applied to entering child on next tick
    - `{animationName}-leave` - Applied to leaving child
    - `{animationName}-leave-active` - Applied to leaving child on next tick
