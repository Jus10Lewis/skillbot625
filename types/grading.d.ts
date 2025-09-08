// Shared grading types used by both the API route and the client page.

export interface GradeRequest {
    language: string;
    instructions: string;
    dataInput?: string;
    rubric: string;
    studentCode?: string;
}

export interface RubricSectionResult {
    id: string;
    title: string;
    maxPoints: number;
    score: number;
    comments: string;
}

export interface GradeResponse {
    relevant: boolean;
    missingCode: boolean;
    message: string;
    sections: RubricSectionResult[];
    total: { earned: number; max: number; percentage: number };
    summary: string;
    suggestions?: string[];
    rubricEcho?: string;
}

export interface ApiError {
    error: string;
    details?: unknown;
}
