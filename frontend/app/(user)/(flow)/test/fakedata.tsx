import { TaskNodeData } from "./type";

const data: TaskNodeData[] = [
  {
    title: "JavaScript Basics",
    tasks: [
      {
        title: "Variables and Constants",
        description: "Learn the difference between var, let, and const.",
        content: `
## Variables and Constants

- **var**: Function scoped variable.
- **let**: Block scoped variable.
- **const**: Block scoped constant.

\`\`\`javascript
let name = "Alice";
const age = 25;
\`\`\`
        `,
        taskUrl: "https://example.com/js-variables",
        types: ["javascript", "basics"],
        difficult: "Easy",
        dificultScore: 2,
        solutionUrl: "https://example.com/js-variables-solution"
      },
      {
        title: "Functions",
        description: "Understand how to declare and use functions.",
        content: `
## Functions

### Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello " + name;
}
\`\`\`

### Function Expression
\`\`\`javascript
const greet = function(name) {
  return "Hello " + name;
};
\`\`\`
        `,
        taskUrl: "https://example.com/js-functions",
        types: ["javascript", "basics"],
        difficult: "Medium",
        dificultScore: 3,
        solutionUrl: "https://example.com/js-functions-solution"
      }
    ]
  },
  {
    title: "React Basics",
    tasks: [
      {
        title: "Components",
        description: "Learn how to create functional components in React.",
        content: `
## Functional Components

\`\`\`javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`
        `,
        taskUrl: "https://example.com/react-components",
        types: ["react", "basics"],
        difficult: "Easy",
        dificultScore: 2,
        solutionUrl: "https://example.com/react-components-solution"
      }
    ]
  }
];