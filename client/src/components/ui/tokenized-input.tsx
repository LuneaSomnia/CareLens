import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface TokenizedInputProps {
  placeholder?: string;
  tokens: string[];
  suggestions?: string[];
  onTokensChange: (tokens: string[]) => void;
  className?: string;
  disabled?: boolean;
}

export function TokenizedInput({
  placeholder = 'Add tags...',
  tokens = [],
  suggestions = [],
  onTokensChange,
  className = '',
  disabled = false
}: TokenizedInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }
    
    const filtered = suggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
      !tokens.includes(suggestion)
    );
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions, tokens]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tokens.includes(inputValue.trim())) {
        onTokensChange([...tokens, inputValue.trim()]);
      }
      setInputValue('');
      setShowSuggestions(false);
    } else if (e.key === 'Backspace' && inputValue === '' && tokens.length > 0) {
      onTokensChange(tokens.slice(0, -1));
    }
  };

  const handleRemoveToken = (index: number) => {
    const newTokens = [...tokens];
    newTokens.splice(index, 1);
    onTokensChange(newTokens);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (!tokens.includes(suggestion)) {
      onTokensChange([...tokens, suggestion]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md bg-white">
        {tokens.map((token, index) => (
          <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
            {token}
            <button 
              type="button" 
              onClick={() => handleRemoveToken(index)}
              disabled={disabled}
              className="ml-1 focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => inputValue.trim() !== '' && setShowSuggestions(true)}
          placeholder={tokens.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6"
          disabled={disabled}
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-neutral-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}