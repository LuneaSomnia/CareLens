import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TokenizedInputProps {
  placeholder?: string;
  tokens: string[];
  suggestions?: string[];
  onTokensChange: (tokens: string[]) => void;
  className?: string;
  disabled?: boolean;
}

export function TokenizedInput({
  placeholder = "Add...",
  tokens,
  suggestions = [],
  onTokensChange,
  className,
  disabled = false,
}: TokenizedInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue) {
      const filtered = suggestions.filter(
        suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key to add a token
    if (e.key === "Enter") {
      e.preventDefault();
      
      if (showSuggestions && filteredSuggestions[activeSuggestion]) {
        addToken(filteredSuggestions[activeSuggestion]);
      } else if (inputValue.trim()) {
        addToken(inputValue.trim());
      }
    }
    // Handle Backspace to remove the last token
    else if (e.key === "Backspace" && !inputValue && tokens.length > 0) {
      const newTokens = [...tokens];
      newTokens.pop();
      onTokensChange(newTokens);
    }
    // Handle arrow keys for suggestion navigation
    else if (e.key === "ArrowDown" && showSuggestions) {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    }
    else if (e.key === "ArrowUp" && showSuggestions) {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    }
  };

  const addToken = (token: string) => {
    if (token && !tokens.includes(token)) {
      onTokensChange([...tokens, token]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeToken = (indexToRemove: number) => {
    const newTokens = tokens.filter((_, index) => index !== indexToRemove);
    onTokensChange(newTokens);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addToken(suggestion);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="flex items-center bg-teal-50 rounded-full px-2 py-1 text-sm"
          >
            <span className="mr-1">{token}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeToken(index)}
                className="text-neutral-600 hover:text-neutral-900"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        {!disabled && (
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={tokens.length ? "" : placeholder}
            className="flex-grow min-w-[100px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8"
          />
        )}
      </div>
      {showSuggestions && (
        <ul className="absolute z-10 bg-white mt-1 w-full border rounded-md shadow-md max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={cn(
                "px-4 py-2 cursor-pointer hover:bg-neutral-50",
                index === activeSuggestion && "bg-neutral-100"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
