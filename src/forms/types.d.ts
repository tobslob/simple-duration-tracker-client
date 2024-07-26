import * as React from "react";

interface WizardPageProps {
  page?: string;
  data?: any;
  onChange?(page: string, data?: any): void;
  onUpdate?(data?: any): void;
  onComplete?(data?: any): void;
  onCancel?(data?: any): void;
  onReset?(data?: any): void;
}

interface WizardMapProps {
  [key: string]: React.ComponentType<WizardPageProps>;
}

interface WizardProps {
  page: string;
  jumpToPage?: string;
  screens: WizardMapProps;
  initialValues?: any;
  onSubmitted?(data: any): void;
  onCancelled?(data: any): void;
  onPageUpdated?(page: string, data: any): void;
}

export { WizardPageProps, WizardMapProps, WizardProps };
