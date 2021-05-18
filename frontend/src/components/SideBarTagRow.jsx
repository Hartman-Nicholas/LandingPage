import React from "react";
import { categoryColors } from "./categoryColors";
export default function TagRow({ tags }) {
  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="tag"
          style={{ color: categoryColors[tag], fontSize: "20px" }}
        >
          ●
        </span>
      ))}
    </div>
  );
}
