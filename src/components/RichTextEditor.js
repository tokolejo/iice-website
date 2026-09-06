'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Undo2,
    Redo2,
    Code,
    RemoveFormatting,
    Eye
} from 'lucide-react';

export default function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'დაწერეთ ტექსტი...',
    minHeight = '180px'
}) {
    const [isSourceMode, setIsSourceMode] = useState(false);
    const [rawHtml, setRawHtml] = useState(value || '');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3]
                }
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#60318e] underline font-semibold hover:text-[#7A1CAC]',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            })
        ],
        content: value || '<p></p>',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setRawHtml(html);
            if (onChange) {
                onChange(html);
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none p-3.5 focus:outline-none min-h-[160px] text-gray-900 leading-relaxed font-normal'
            }
        }
    });

    // Keep TipTap in sync if parent value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML() && !isSourceMode) {
            editor.commands.setContent(value || '<p></p>');
            setRawHtml(value || '');
        }
    }, [value, editor, isSourceMode]);

    const setLink = () => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('შეიყვანეთ ბმული (URL):', previousUrl || 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const handleRawHtmlChange = (e) => {
        const val = e.target.value;
        setRawHtml(val);
        if (onChange) {
            onChange(val);
        }
        if (editor) {
            editor.commands.setContent(val);
        }
    };

    const toggleSourceMode = () => {
        if (isSourceMode && editor) {
            editor.commands.setContent(rawHtml);
        }
        setIsSourceMode(!isSourceMode);
    };

    if (!editor) {
        return (
            <div className="w-full h-32 rounded-xl border border-gray-200 bg-slate-50 flex items-center justify-center text-xs text-gray-400 font-medium">
                იტვირთება ედითორი...
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-purple-200/80 bg-white overflow-hidden shadow-xs focus-within:border-[#AD49E1] focus-within:ring-2 focus-within:ring-[#AD49E1]/20 transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-purple-100 text-gray-700 select-none">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('bold') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="გამუქება (Bold)"
                >
                    <Bold className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('italic') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="დახრა (Italic)"
                >
                    <Italic className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('underline') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="ხაზგასმა (Underline)"
                >
                    <UnderlineIcon className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('strike') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="გადახაზვა (Strike)"
                >
                    <Strikethrough className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-4 bg-gray-300 mx-1"></span>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded-lg text-xs font-black transition-colors cursor-pointer flex items-center gap-1 ${
                        editor.isActive('heading', { level: 2 }) ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="სათაური H2"
                >
                    <Heading2 className="w-3.5 h-3.5" />
                    <span>H2</span>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 rounded-lg text-xs font-black transition-colors cursor-pointer flex items-center gap-1 ${
                        editor.isActive('heading', { level: 3 }) ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="სათაური H3"
                >
                    <Heading3 className="w-3.5 h-3.5" />
                    <span>H3</span>
                </button>

                <span className="w-px h-4 bg-gray-300 mx-1"></span>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('bulletList') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="ბულეტები (Bullet List)"
                >
                    <List className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('orderedList') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="დანომრილი სია (Ordered List)"
                >
                    <ListOrdered className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('blockquote') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="ციტატა (Blockquote)"
                >
                    <Quote className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={setLink}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editor.isActive('link') ? 'bg-[#60318e] text-white' : 'hover:bg-purple-100 text-gray-700'
                    }`}
                    title="ბმული (Link)"
                >
                    <LinkIcon className="w-3.5 h-3.5" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="p-1.5 rounded-lg text-xs hover:bg-purple-100 text-gray-700 transition-colors cursor-pointer"
                    title="ფორმატირების გასუფთავება"
                >
                    <RemoveFormatting className="w-3.5 h-3.5" />
                </button>

                <div className="ml-auto flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="p-1.5 rounded-lg text-xs hover:bg-purple-100 text-gray-700 transition-colors disabled:opacity-30 cursor-pointer"
                        title="უკან დაბრუნება (Undo)"
                    >
                        <Undo2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="p-1.5 rounded-lg text-xs hover:bg-purple-100 text-gray-700 transition-colors disabled:opacity-30 cursor-pointer"
                        title="წინ წაწევა (Redo)"
                    >
                        <Redo2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                        type="button"
                        onClick={toggleSourceMode}
                        className={`ml-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 border ${
                            isSourceMode
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-white text-[#60318e] border-purple-200 hover:bg-purple-50'
                        }`}
                        title="HTML კოდის რეჟიმი"
                    >
                        {isSourceMode ? (
                            <>
                                <Eye className="w-3 h-3 text-amber-700" />
                                <span>ვიზუალური</span>
                            </>
                        ) : (
                            <>
                                <Code className="w-3 h-3 text-[#60318e]" />
                                <span>HTML კოდი</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ minHeight }}>
                {isSourceMode ? (
                    <textarea
                        value={rawHtml}
                        onChange={handleRawHtmlChange}
                        placeholder="ჩასვით ან დაარედაქტირეთ HTML კოდი..."
                        className="w-full p-4 font-mono text-xs text-gray-800 bg-slate-50 focus:outline-none min-h-[180px] resize-y"
                    />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
        </div>
    );
}
