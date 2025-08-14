// pages/index.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, List } from 'antd';
// import { Comment } from '@ant-design/compatible';  // 使用兼容包
// import '@ant-design/compatible/assets/index.css';
import 'antd/dist/reset.css';

interface CommentItem { id: number; selectedText: string; content: string; anchorId: string; }

export default function Home() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [inputInfo, setInputInfo] = useState<{
    show: boolean;
    top: number;
    left: number;
    text: string;
  }>({ show: false, top: 0, left: 0, text: '' });
  const [commentContent, setCommentContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && contentRef.current?.contains(sel.anchorNode)) {
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      setInputInfo({
        show: true,
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX - 220,
        text: sel.toString(),
      });
    } else if (!contentRef.current?.contains(e.target as Node)) {
      setInputInfo(info => ({ ...info, show: false }));
    }
  };

  const addComment = () => {
    const id = Date.now();
    const anchorId = `anchor-${id}`;
    markSelection(anchorId);
    setComments(prev => [...prev, { id, selectedText: inputInfo.text, content: commentContent, anchorId }]);
    setCommentContent('');
    setInputInfo(info => ({ ...info, show: false }));
    window.getSelection()?.removeAllRanges();
  };

  const markSelection = (anchorId: string) => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.id = anchorId;
      span.className = 'bg-yellow-200 rounded';
      range.surroundContents(span);
    }
  };

  const scrollToAnchor = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-orange-300');
      setTimeout(() => el.classList.remove('ring-2', 'ring-orange-300'), 1000);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex h-screen">
      <div ref={contentRef} className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">文档标题</h1>
        <p className="mb-4">
          这是一段示例文档内容。试着选中一些文字，然后点击弹出按钮进行评论，评论会显示在右侧侧边栏中。
        </p>
        {/* 更多内容... */}
        {inputInfo.show && (
          <div
            className="absolute bg-white shadow-lg border rounded-lg p-4 z-50"
            style={{ top: inputInfo.top, left: inputInfo.left, width: 220 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="mb-2 text-sm text-gray-600">
              评论 <span className="font-semibold">{inputInfo.text}</span>
            </div>
            <Input.TextArea
              rows={3}
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              placeholder="写点想法..."
              autoFocus
            />
            <div className="mt-2 flex justify-end space-x-2">
              <Button size="small" onClick={() => setInputInfo(info => ({ ...info, show: false }))}>
                取消
              </Button>
              <Button type="primary" size="small" onClick={addComment}>
                提交
              </Button>
            </div>
          </div>
        )}
      </div>

      <aside className="w-80 min-w-[300px] border-l p-4 bg-gray-50 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">评论</h2>
        <List
          dataSource={comments}
          locale={{ emptyText: '暂无评论' }}
          renderItem={item => (
            <List.Item className="cursor-pointer hover:bg-white p-2 rounded-lg transition" onClick={() => scrollToAnchor(item.anchorId)}>
              {/* <Comment author={item.selectedText} content={item.content} /> */}
            </List.Item>
          )}
        />
      </aside>
    </div>
  );
}
