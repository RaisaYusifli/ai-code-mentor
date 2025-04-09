import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Fix the Array Filter",
    description: "The filter function below should return only even numbers, but it's not working correctly. Can you fix it?",
    initialCode: `function filterEvenNumbers(numbers) {
  return numbers.filter(num => num / 2 === 0);
}`,
    solution: `function filterEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}`,
    testCase: `filterEvenNumbers([1, 2, 3, 4, 5, 6])`,
    expectedResult: `[2, 4, 6]`,
    difficulty: 'easy'
  },
  {
    id: 2,
    title: "Implement a Debounce Function",
    description: "Create a debounce function that delays invoking a function until after a specified wait time has elapsed.",
    initialCode: `function debounce(func, wait) {
  // Your implementation here
}`,
    solution: `function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}`,
    testCase: `// Example usage (not executable in this environment)
const debouncedSearch = debounce(searchAPI, 300);
// Call debouncedSearch multiple times in quick succession
// Only the last call will execute after 300ms`,
    expectedResult: `// Function will only be called once, 300ms after the last invocation`,
    difficulty: 'medium'
  },
  {
    id: 3,
    title: "Implement Array Flatten",
    description: "Create a function that flattens a nested array structure into a single-level array.",
    initialCode: `function flattenArray(arr) {
  // Your implementation here
}`,
    solution: `function flattenArray(arr) {
  return arr.reduce((flat, current) => {
    return flat.concat(Array.isArray(current) ? flattenArray(current) : current);
  }, []);
}`,
    testCase: `flattenArray([1, [2, 3], [4, [5, 6]]])`,
    expectedResult: `[1, 2, 3, 4, 5, 6]`,
    difficulty: 'medium'
  },
  {
    id: 4,
    title: "Fix the Promise Chain",
    description: "The following promise chain should log numbers 1, 2, and 3 in order, but it's not working correctly. Fix the code to make it work as expected.",
    initialCode: `function executePromiseChain() {
  return Promise.resolve()
    .then(() => {
      .log(1);
    })
    .then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(2);
        }, 100);
      });
    })
    .then(() => {
      console.log(3);
    });
}`,
    solution: `function executePromiseChain() {
  return Promise.resolve()
    .then(() => {
      console.log(1);
    })
    .then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(2);
          resolve();
        }, 100);
      });
    })
    .then(() => {
      console.log(3);
    });
}`,
    testCase: `executePromiseChain()`,
    expectedResult: `// Should log:
// 1
// 2 (after a brief delay)
// 3 (after 2 is logged)`,
    difficulty: 'medium'
  },
  {
    id: 5,
    title: "Implement Memoization",
    description: "Create a memoization function that caches the results of expensive function calls and returns the cached result when the same inputs are supplied again.",
    initialCode: `function memoize(fn) {
  // Your implementation here
}`,
    solution: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] === undefined) {
      cache[key] = fn.apply(this, args);
    }
    return cache[key];
  };
}`,
    testCase: `const expensiveCalculation = (n) => {
  console.log('Computing...');
  return n * n;
};

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(4)); // Should compute
console.log(memoizedCalc(4)); // Should use cached result`,
    expectedResult: `// Computing...
// 16
// 16 (without logging "Computing..." again)`,
    difficulty: 'medium'
  },
  {
    id: 6,
    title: "Fix Closure Bug",
    description: "The following code should create 3 buttons that alert 0, 1, and 2 when clicked, but they all alert the same number. Fix the closure bug.",
    initialCode: `function createButtons() {
  const buttons = [];
  for (var i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    button.addEventListener('click', function() {
      alert(i);
    });
    buttons.push(button);
  }
  return buttons;
}`,
    solution: `function createButtons() {
  const buttons = [];
  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    button.addEventListener('click', function() {
      alert(i);
    });
    buttons.push(button);
  }
  return buttons;
}`,
    testCase: `// When buttons are clicked, they should alert their index`,
    expectedResult: `// Button 0 alerts 0, Button 1 alerts 1, Button 2 alerts 2`,
    difficulty: 'easy'
  },
  {
    id: 7,
    title: "Implement Deep Clone",
    description: "Create a function that performs a deep clone of an object, handling nested objects and arrays.",
    initialCode: `function deepClone(obj) {
  // Your implementation here
}`,
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
}`,
    testCase: `const original = {
  a: 1,
  b: { c: 2 },
  d: [3, 4, { e: 5 }]
};
const clone = deepClone(original);
original.b.c = 10;
console.log(clone.b.c);`,
    expectedResult: `// Should log 2, not 10, because it's a deep clone`,
    difficulty: 'hard'
  },
  {
    id: 8,
    title: "Create a Simple Pub/Sub Pattern",
    description: "Implement a simple publish/subscribe (pub/sub) pattern that allows subscribing to events and publishing events with data.",
    initialCode: `const EventBus = {
  // Your implementation here
};`,
    solution: `const EventBus = {
  events: {},
  
  subscribe: function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    return {
      unsubscribe: () => {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      }
    };
  },
  
  publish: function(event, data) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(callback => {
      callback(data);
    });
  }
};`,
    testCase: `const subscription = EventBus.subscribe('userCreated', (data) => {
  console.log('User created:', data.name);
});

EventBus.publish('userCreated', { name: 'John' });

subscription.unsubscribe();
EventBus.publish('userCreated', { name: 'Jane' });`,
    expectedResult: `// Should log:
// User created: John
// (No output for Jane after unsubscribe)`,
    difficulty: 'hard'
  },
  {
    id: 9,
    title: "Fix the This Context",
    description: "The following code is supposed to increment the counter when the button is clicked, but it doesn't work because of 'this' context issues. Fix it.",
    initialCode: `const counter = {
  count: 0,
  button: document.createElement('button'),
  
  init: function() {
    this.button.textContent = 'Count: ' + this.count;
    this.button.addEventListener('click', this.increment);
    return this.button;
  },
  
  increment: function() {
    this.count++;
    this.button.textContent = 'Count: ' + this.count;
  }
};`,
    solution: `const counter = {
  count: 0,
  button: document.createElement('button'),
  
  init: function() {
    this.button.textContent = 'Count: ' + this.count;
    this.button.addEventListener('click', this.increment.bind(this));
    return this.button;
  },
  
  increment: function() {
    this.count++;
    this.button.textContent = 'Count: ' + this.count;
  }
};`,
    testCase: `const button = counter.init();
// When button is clicked, counter should increment`,
    expectedResult: `// After clicks, the button text should update to "Count: 1", "Count: 2", etc.`,
    difficulty: 'medium'
  },
  {
    id: 10,
    title: "Implement Curry Function",
    description: "Create a curry function that converts a function with multiple arguments into a sequence of functions that each take a single argument.",
    initialCode: `function curry(fn) {
  // Your implementation here
}`,
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}`,
    testCase: `function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));`,
    expectedResult: `// 6
// 6
// 6`,
    difficulty: 'hard'
  },
  {
    id: 11,
    title: "Fix Async Data Fetching",
    description: "The following function is supposed to fetch user data and then fetch the user's posts, but it has an issue with promise handling. Fix it.",
    initialCode: `async function fetchUserData(userId) {
  const userData = await fetchUser(userId);
  const userPosts = fetchUserPosts(userData.id);
  
  return {
    user: userData,
    posts: userPosts
  };
}

// Mock implementations for testing
function fetchUser(id) {
  return Promise.resolve({ id, name: 'User ' + id });
}

function fetchUserPosts(userId) {
  return Promise.resolve([
    { id: 1, userId, title: 'Post 1' },
    { id: 2, userId, title: 'Post 2' }
  ]);
}`,
    solution: `async function fetchUserData(userId) {
  const userData = await fetchUser(userId);
  const userPosts = await fetchUserPosts(userData.id);
  
  return {
    user: userData,
    posts: userPosts
  };
}

// Mock implementations for testing
function fetchUser(id) {
  return Promise.resolve({ id, name: 'User ' + id });
}

function fetchUserPosts(userId) {
  return Promise.resolve([
    { id: 1, userId, title: 'Post 1' },
    { id: 2, userId, title: 'Post 2' }
  ]);
}`,
    testCase: `fetchUserData(1).then(data => console.log(data));`,
    expectedResult: `// Should log an object with user data and an array of posts
// Not a user object and a promise`,
    difficulty: 'medium'
  },
  {
    id: 12,
    title: "Implement Throttle Function",
    description: "Create a throttle function that ensures a function is called at most once in a specified time period.",
    initialCode: `function throttle(func, limit) {
  // Your implementation here
}`,
    solution: `function throttle(func, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}`,
    testCase: `const throttledLog = throttle((message) => {
  console.log(message, new Date().toLocaleTimeString());
}, 1000);

// Simulate rapid calls
throttledLog('Call 1');
throttledLog('Call 2'); // Should be ignored
throttledLog('Call 3'); // Should be ignored

// After 1 second
setTimeout(() => {
  throttledLog('Call 4'); // Should be executed
}, 1100);`,
    expectedResult: `// Call 1 [timestamp]
// Call 4 [timestamp] (after ~1 second)`,
    difficulty: 'medium'
  },
  {
    id: 13,
    title: "Fix Event Delegation",
    description: "The following code tries to use event delegation to handle clicks on all list items, but it doesn't work correctly. Fix it.",
    initialCode: `function setupList() {
  const list = document.createElement('ul');
  
  for (let i = 1; i <= 5; i++) {
    const item = document.createElement('li');
    item.textContent = 'Item ' + i;
    list.appendChild(item);
  }
  
  list.addEventListener('click', function(event) {
    if (event.target.nodeName === 'li') {
      console.log('Clicked:', event.target.textContent);
    }
  });
  
  return list;
}`,
    solution: `function setupList() {
  const list = document.createElement('ul');
  
  for (let i = 1; i <= 5; i++) {
    const item = document.createElement('li');
    item.textContent = 'Item ' + i;
    list.appendChild(item);
  }
  
  list.addEventListener('click', function(event) {
    if (event.target.nodeName.toLowerCase() === 'li') {
      console.log('Clicked:', event.target.textContent);
    }
  });
  
  return list;
}`,
    testCase: `const list = setupList();
// Clicking on any list item should log its text`,
    expectedResult: `// When clicking "Item 3", should log: Clicked: Item 3`,
    difficulty: 'easy'
  },
  {
    id: 14,
    title: "Implement a Basic State Management Store",
    description: "Create a simple state management store with the ability to get state, update state, and subscribe to state changes.",
    initialCode: `function createStore(initialState) {
  // Your implementation here
}`,
    solution: `function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  
  return {
    getState: () => state,
    
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    }
  };
}`,
    testCase: `const store = createStore({ count: 0 });
const unsubscribe = store.subscribe((state) => {
  console.log('State updated:', state);
});

store.setState({ count: 1 });
store.setState({ user: 'John' });
unsubscribe();
store.setState({ count: 2 });`,
    expectedResult: `// State updated: { count: 1 }
// State updated: { count: 1, user: 'John' }
// (No log for the last update after unsubscribe)`,
    difficulty: 'hard'
  },
  {
    id: 15,
    title: "Fix Recursive Function",
    description: "The following recursive function to calculate factorial has a bug that causes a stack overflow for large numbers. Fix it using tail recursion optimization.",
    initialCode: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
    solution: `function factorial(n, acc = 1) {
  if (n <= 1) {
    return acc;
  }
  return factorial(n - 1, n * acc);
}`,
    testCase: `console.log(factorial(5));
console.log(factorial(10));
// Try with factorial(10000) - should not overflow stack`,
    expectedResult: `// 120
// 3628800`,
    difficulty: 'hard'
  }
];