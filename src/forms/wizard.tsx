import { WizardProps } from "./types";
import * as React from "react";

export default function Component({
  page,
  jumpToPage,
  initialValues = {},
  onCancelled,
  onSubmitted,
  screens,
  onPageUpdated,
}: WizardProps) {
  const [currentPage, setCurrentPage] = React.useState<string>(page);
  const [formData, setFormData] = React.useState(initialValues);

  React.useEffect(() => {
    onPageUpdated?.(currentPage, formData);
  }, [currentPage, formData]);

  React.useEffect(() => {
    jumpToPage && setCurrentPage(jumpToPage);
  }, [jumpToPage]);

  const onCancel = (data: any) => {
    onCancelled?.(data);
  };
  const onComplete = (data: any) => {
    onSubmitted?.({ ...formData, ...data });
  };
  const onChange = (nextPage: string, data: any) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
    setCurrentPage(nextPage);
  };
  const onUpdate = (data: any) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
  };
  const onReset = () => {
    setFormData(() => ({ ...initialValues }));
    setCurrentPage(page);
  };

  const PageComponent = screens[currentPage];

  return (
    <div>
      {PageComponent ? (
        <PageComponent
          onCancel={onCancel}
          onComplete={onComplete}
          onChange={onChange}
          onReset={onReset}
          onUpdate={onUpdate}
          data={formData}
          page={currentPage}
        />
      ) : null}
    </div>
  );
}
