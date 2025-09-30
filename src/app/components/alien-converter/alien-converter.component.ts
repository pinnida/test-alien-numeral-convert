import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { alienToInt, ALIEN_SYMBOLS, AlienSymbol } from '../../utils/alien-to-int.util';

interface ConversionResult {
  value: number | null;
  error: string | null;
  isValid: boolean;
}

interface Example {
  input: string;
  output: number;
  description: string;
}

@Component({
  selector: 'app-alien-converter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './alien-converter.component.html',
  styleUrls: ['./alien-converter.component.scss']
})
export class AlienConverterComponent implements OnInit {
  
  // Form control for input
  alienInput = new FormControl('', [
    Validators.required,
    this.alienNumeralValidator.bind(this)
  ]);

  // Component state
  result: ConversionResult = { value: null, error: null, isValid: false };
  isLoading = false;
  isConverting = false;

  // Data for the symbol table
  symbols: AlienSymbol[] = ALIEN_SYMBOLS;
  displayedColumns: string[] = ['symbol', 'value'];

  // Example data for quick testing
  examples: Example[] = [
    { input: 'AAA', output: 3, description: 'Three A\'s = 3' },
    { input: 'LBAAA', output: 58, description: 'L + B + AAA = 58' },
    { input: 'RCRZCAB', output: 1994, description: 'R + CR + ZC + AB = 1994' }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Set up real-time validation
    this.alienInput.valueChanges.subscribe(() => {
      this.validateInput();
    });
  }

  /**
   * Custom validator for alien numerals
   */
  alienNumeralValidator(control: FormControl): {[key: string]: any} | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }

    const value = control.value.trim().toUpperCase();
    const validChars = /^[ABZLCDR]+$/;
    
    if (!validChars.test(value)) {
      return { invalidAlienNumeral: true };
    }

    return null;
  }

  /**
   * Validates input in real-time
   */
  validateInput(): void {
    const inputValue = this.alienInput.value?.trim();
    
    if (!inputValue) {
      this.result = { value: null, error: null, isValid: false };
      return;
    }

    // Check for invalid characters
    const validChars = /^[ABZLCDR]+$/i;
    if (!validChars.test(inputValue)) {
      this.result = {
        value: null,
        error: 'Only characters A, B, Z, L, C, D, R are allowed',
        isValid: false
      };
      return;
    }

    // Input is valid
    this.result = { value: null, error: null, isValid: true };
  }

  /**
   * Converts the alien numeral to integer
   */
  async convert(): Promise<void> {
    if (!this.alienInput.value?.trim() || !this.result.isValid) {
      return;
    }

    this.isConverting = true;
    this.isLoading = true;

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const result = alienToInt(this.alienInput.value);
      this.result = { value: result, error: null, isValid: true };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Conversion failed';
      this.result = { value: null, error: errorMessage, isValid: false };
      this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
    } finally {
      this.isLoading = false;
      this.isConverting = false;
    }
  }

  /**
   * Handles Enter key press
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isConverting && this.result.isValid) {
      this.convert();
    }
  }

  /**
   * Sets example input and converts automatically
   */
  useExample(example: Example): void {
    this.alienInput.setValue(example.input);
    this.validateInput();
    
    // Auto-convert after setting the example
    setTimeout(() => {
      if (this.result.isValid) {
        this.convert();
      }
    }, 100);
  }

  /**
   * Clears the input and result
   */
  clear(): void {
    this.alienInput.setValue('');
    this.result = { value: null, error: null, isValid: false };
  }

  /**
   * Gets the validation error message
   */
  getValidationErrorMessage(): string {
    const errors = this.alienInput.errors;
    if (errors?.['required']) {
      return 'Alien numeral is required';
    }
    if (errors?.['invalidAlienNumeral']) {
      return 'Only characters A, B, Z, L, C, D, R are allowed';
    }
    return '';
  }

  /**
   * Checks if convert button should be disabled
   */
  isConvertDisabled(): boolean {
    return !this.alienInput.value?.trim() || !this.result.isValid || this.isConverting;
  }

  /**
   * Gets the result display text
   */
  getResultText(): string {
    if (this.result.error) {
      return `Error: ${this.result.error}`;
    }
    if (this.result.value !== null) {
      return `${this.result.value}`;
    }
    return 'Enter an alien numeral to convert';
  }

  /**
   * Checks if result has an error
   */
  hasError(): boolean {
    return !!this.result.error;
  }

  /**
   * Checks if result is successful
   */
  hasSuccess(): boolean {
    return this.result.value !== null && !this.result.error;
  }
}
