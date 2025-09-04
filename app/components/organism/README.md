# 🏗️ Organisms

**Organisms** are groups of **Molecules** and **Atoms** combined together,
forming large and well-structured UI sections.

---

## ✨ Characteristics

- Form a complete interface block.
- Combine multiple **Molecules** and **Atoms**.
- Usually appear as part of a layout/page.

---

## 📌 Examples

### Header.tsx

```tsx
import React from "react";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";

type HeaderProps = {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  query,
  onQueryChange,
  onSearch,
}) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <h1>MyApp</h1>
      <SearchBar query={query} onChange={onQueryChange} onSearch={onSearch} />
      <Button label="Login" onClick={() => alert("Login clicked!")} />
    </header>
  );
};
```
