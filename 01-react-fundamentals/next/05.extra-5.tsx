// TypeScript with React
// http://localhost:3000/isolated/exercise/05.tsx

type OperationFn = (left: number, right: number) => number;

// 💯 Use a “Constrained Identity Function (CIF)” to enforce the values
// of our operations object, without having to annotate our object.
// 📜 https://kentcdodds.com/blog/how-to-write-a-constrained-identity-function-in-typescript
const createOperations = <OperationsType extends Record<string, OperationFn>>(
  operations: OperationsType
) => operations;

const operations = createOperations({
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "*": (left, right) => left * right,
  "/": (left, right) => left / right,
});

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
