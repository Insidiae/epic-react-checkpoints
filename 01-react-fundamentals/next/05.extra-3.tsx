// TypeScript with React
// http://localhost:3000/isolated/exercise/05.tsx

const operations = {
  "+": (left: number, right: number): number => left + right,
  "-": (left: number, right: number): number => left - right,
  "*": (left: number, right: number): number => left * right,
  "/": (left: number, right: number): number => left / right,
};

// 💯 Make all props optional.
type CalculatorProps = {
  left?: number;
  operator?: keyof typeof operations;
  right?: number;
};

// 💯 Default `left` and `right` to `0` and `operator` to `'+'`.
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

// 💯 You can update the App to test it out:
//   <Calculator left={1} right={2} />
//   <Calculator operator="-" />
//   <Calculator left={1} operator="*" />
//   <Calculator operator="/" right={2} />
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
