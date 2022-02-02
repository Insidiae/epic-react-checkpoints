// TypeScript with React
// http://localhost:3000/isolated/exercise/05.tsx

// 💯 Create a union of all allowed operations
type Operator = "+" | "-" | "*" | "/";

// 💯 Extract the operator functions into a type OperatorFn
// OperatorFn accepts two numbers and returns a number.
// 📜 https://kentcdodds.com/blog/typescript-function-syntaxes
type OperationFn = (left: number, right: number) => number;

// 💯 Create a Record where the key is one of the valid operators
// and the value is an OperationFn.
// 📜 https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype
const operations: Record<Operator, OperationFn> = {
  // 💯 Remove the duplicated typing for all the functions
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "*": (left, right) => left * right,
  "/": (left, right) => left / right,
};

type CalculatorProps = {
  left?: number;
  operator?: keyof typeof operations;
  right?: number;
};

function Calculator({ left = 0, operator = "+", right = 0 }: CalculatorProps) {
  const result = operations[operator](left, right);
  return (
    <div>
      <code>
        {left} {operator} {right} = <output>{result}</output>
      </code>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Calculator</h1>
      <Calculator left={1} operator="+" right={2} />
      <Calculator left={1} operator="-" right={2} />
      <Calculator left={1} operator="*" right={2} />
      <Calculator left={1} operator="/" right={2} />
    </div>
  );
}

export { App };
