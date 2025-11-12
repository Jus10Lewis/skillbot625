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

// Assignment types
export interface Assignment {
    id: string;
    title: string;
    class?: string;
    dueDate?: string;
    totalPoints: number;
    instructions: string;
    rubric: string;
    language: string;
    createdAt: string;
    userId: string;
}

export interface CreateAssignmentRequest {
    title: string;
    class?: string;
    dueDate?: string;
    totalPoints: number;
    instructions: string;
    rubric: string;
    language: string;
}

export interface CreateAssignmentResponse {
    success: boolean;
    assignment?: Assignment;
    error?: string;
}

// Submission types
export interface Submission {
    id: string;
    assignmentId: string;
    userId: string;
    studentName: string;
    submittedCode: string;
    language: string;
    grade: number;
    totalPoints: number;
    feedback: GradeResponse; // Store the full GPT response
    createdAt: string;
    updatedAt: string;
}

export interface CreateSubmissionRequest {
    assignmentId: string;
    studentName: string;
    studentCode: string;
    gradeResponse: GradeResponse;
    language: string;
    totalPoints: number;
}

export interface CreateSubmissionResponse {
    success: boolean;
    submission?: Submission;
    error?: string;
}
