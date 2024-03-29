// Fix "perf death by a thousand cuts"
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();
// 💯 Create another context for the dog input
const DogContext = React.createContext();

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

function appReducer(state, action) {
  switch (action.type) {
    case "UPDATE_GRID_CELL": {
      return { ...state, grid: updateGridCellState(state.grid, action) };
    }
    case "UPDATE_GRID": {
      return { ...state, grid: updateGridState(state.grid) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    grid: initialGrid,
  });

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

// 💯 Create a reducer function for the global dog state
function dogReducer(state, action) {
  switch (action.type) {
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// 💯 Create a provider for the DogContext
function DogProvider(props) {
  const [state, dispatch] = React.useReducer(dogReducer, { dogName: "" });
  const value = [state, dispatch];
  return <DogContext.Provider value={value} {...props} />;
}

// 💯 Create a consumer hook for the DogContext
function useDogContext() {
  const context = React.useContext(DogContext);
  if (!context) {
    throw new Error("useDogContext must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => dispatch({ type: "UPDATE_GRID" });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}
Grid = React.memo(Grid);

function Cell({ row, column }) {
  const state = useAppState();
  const cell = state.grid[row][column];
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = React.memo(Cell);

function DogNameInput() {
  // 💯 replace the normal useState with a useDogContext and useAppDispatch here
  const [state, dispatch] = useDogContext();
  const { dogName } = state;
  // const [dogName, setDogName] = React.useState('')

  function handleChange(event) {
    const newDogName = event.target.value;
    // 💯 change this to call your dispatch that you get from context
    dispatch({ type: "TYPED_IN_DOG_INPUT", dogName: newDogName });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}
function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      {/* 💯 Wrap the DogNameInput in the DogProvider
          and the Grid in the AppProvider
      */}
      <div>
        <DogProvider>
          <DogNameInput />
        </DogProvider>
        <AppProvider>
          <Grid />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;

/*
eslint
  no-func-assign: 0,
*/
