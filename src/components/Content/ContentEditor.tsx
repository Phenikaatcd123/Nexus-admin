import React, { useState, useEffect } from 'react';
import { ContentPage, ContentCategory } from '../../types';
import './ContentEditor.css';

interface ContentEditorProps {
  page?: ContentPage | null;
  categories: ContentCategory[];
  onSave: (page: Omit<ContentPage, 'id' | 'views' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  page,
  categories,
  onSave,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'DRAFT' as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
    author: localStorage.getItem('username') || '',
    authorId: localStorage.getItem('userId') || '1',
    categories: [] as string[],
    tags: [] as string[],
    seo: {
      title: '',
      description: '',
      keywords: [] as string[],
      ogImage: ''
    },
    version: 1
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        excerpt: page.excerpt || '',
        featuredImage: page.featuredImage || '',
        status: page.status,
        author: page.author,
        authorId: page.authorId,
        categories: page.categories,
        tags: page.tags,
        seo: {
          title: page.seo.title,
          description: page.seo.description,
          keywords: page.seo.keywords,
          ogImage: page.seo.ogImage || ''
        },
        version: page.version + 1
      });
    } else {
      generateSlug();
    }
  }, [page]);

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      setFormData({ ...formData, slug });
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    if (!page) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, title, slug }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug không được để trống';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung không được để trống';
    }
    if (formData.categories.length === 0) {
      newErrors.categories = 'Chọn ít nhất 1 danh mục';
    }
    if (!formData.seo.title.trim()) {
      newErrors['seo.title'] = 'SEO title không được để trống';
    }
    if (!formData.seo.description.trim()) {
      newErrors['seo.description'] = 'SEO description không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    const pageData = {
      ...formData,
      updatedAt: new Date().toISOString(),
      publishedAt: formData.status === 'PUBLISHED' ? new Date().toISOString() : undefined
    };
    onSave(pageData);
  }
};

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.seo.keywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          keywords: [...formData.seo.keywords, keywordInput.trim()]
        }
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords.filter(k => k !== keyword)
      }
    });
  };

  return (
    <div className="content-editor-overlay">
      <div className="content-editor">
        <div className="editor-header">
          <h2>{page ? 'Chỉnh sửa trang' : 'Tạo trang mới'}</h2>
          <button className="close-btn" onClick={onCancel}>&times;</button>
        </div>

        <div className="editor-tabs">
          <button
            className={`tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📝 Nội dung
          </button>
          <button
            className={`tab ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            🔍 SEO
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Cài đặt
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="editor-body">
            {activeTab === 'content' && (
              <div className="tab-content">
                <div className="form-group">
                  <label>Tiêu đề <span className="required">*</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Nhập tiêu đề trang"
                    className={errors.title ? 'error' : ''}
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label>Slug <span className="required">*</span></label>
                  <div className="slug-input">
                    <span className="slug-prefix">/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      placeholder="about-us"
                      className={errors.slug ? 'error' : ''}
                    />
                  </div>
                  {errors.slug && <span className="error-message">{errors.slug}</span>}
                </div>

                <div className="form-group">
                  <label>Nội dung <span className="required">*</span></label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Nhập nội dung HTML..."
                    rows={12}
                    className={errors.content ? 'error' : ''}
                  />
                  {errors.content && <span className="error-message">{errors.content}</span>}
                </div>

                <div className="form-group">
                  <label>Mô tả ngắn (Excerpt)</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Mô tả ngắn về trang"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Ảnh đại diện</label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {formData.featuredImage && (
                  <div className="image-preview">
                    <img src={formData.featuredImage} alt="Preview" />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="tab-content">
                <div className="form-group">
                  <label>SEO Title <span className="required">*</span></label>
                  <input
                    type="text"
                    value={formData.seo.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, title: e.target.value }
                    })}
                    placeholder="Nhập SEO title"
                    className={errors['seo.title'] ? 'error' : ''}
                  />
                  {errors['seo.title'] && <span className="error-message">{errors['seo.title']}</span>}
                  <small className="hint">
                    {formData.seo.title.length}/60 ký tự
                  </small>
                </div>

                <div className="form-group">
                  <label>SEO Description <span className="required">*</span></label>
                  <textarea
                    value={formData.seo.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, description: e.target.value }
                    })}
                    placeholder="Nhập SEO description"
                    rows={3}
                    className={errors['seo.description'] ? 'error' : ''}
                  />
                  {errors['seo.description'] && <span className="error-message">{errors['seo.description']}</span>}
                  <small className="hint">
                    {formData.seo.description.length}/160 ký tự
                  </small>
                </div>

                <div className="form-group">
                  <label>SEO Keywords</label>
                  <div className="tags-input">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Thêm keyword và nhấn Enter"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                    />
                    <button type="button" onClick={handleAddKeyword}>Thêm</button>
                  </div>
                  <div className="tags-list">
                    {formData.seo.keywords.map(keyword => (
                      <span key={keyword} className="tag">
                        #{keyword}
                        <button type="button" onClick={() => handleRemoveKeyword(keyword)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>OG Image</label>
                  <input
                    type="url"
                    value={formData.seo.ogImage}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, ogImage: e.target.value }
                    })}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>

                {formData.seo.ogImage && (
                  <div className="image-preview">
                    <img src={formData.seo.ogImage} alt="OG Preview" />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="tab-content">
                <div className="form-group">
                  <label>Danh mục <span className="required">*</span></label>
                  <div className="categories-select">
                    {categories.map(cat => (
                      <label key={cat.id} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(cat.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                categories: [...formData.categories, cat.name]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                categories: formData.categories.filter(c => c !== cat.name)
                              });
                            }
                          }}
                        />
                        <span className="checkbox-text">
                          {cat.name}
                          <span className="category-count">({cat.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.categories && <span className="error-message">{errors.categories}</span>}
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <div className="tags-input">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Thêm tag và nhấn Enter"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button type="button" onClick={handleAddTag}>Thêm</button>
                  </div>
                  <div className="tags-list">
                    {formData.tags.map(tag => (
                      <span key={tag} className="tag">
                        #{tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({
                      ...formData,
                      status: e.target.value as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
                    })}
                  >
                    <option value="PUBLISHED">Đã xuất bản</option>
                    <option value="DRAFT">Bản nháp</option>
                    <option value="ARCHIVED">Lưu trữ</option>
                  </select>
                </div>

                {page && (
                  <div className="info-box">
                    <h4>Thông tin trang</h4>
                    <p>Ngày tạo: {new Date(page.createdAt).toLocaleString('vi-VN')}</p>
                    <p>Lượt xem: {page.views.toLocaleString()}</p>
                    <p>Phiên bản: {page.version}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="editor-footer">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {page ? 'Cập nhật' : 'Tạo trang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentEditor;