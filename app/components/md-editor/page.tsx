
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";

interface MarkdownEditorProps extends Omit<MDEditorProps, 'onChange' | 'value'> {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  height?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const { id, value = '', onChange, height = 400, ...restProps } = props;

  return (
    <span id={id}>
      <MDEditor value={value} onChange={v => onChange?.(v || '')} height={height} {...restProps} />
    </span>
  );
};

export default MarkdownEditor;
