import React, { useState, useEffect } from 'react';
import { ContentPage, ContentCategory } from '../../types';
import { mockContentPages, mockContentCategories } from '../../data/mockContentData';
import ContentFilters from '../../components/Content/ContentFilters';
import ContentTable from '../../components/Content/ContentTable';
import ContentStats from '../../components/Content/ContentStats';
import ContentEditor from '../../components/Content/ContentEditor';
import ContentPreview from '../../components/Content/ContentPreview';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import toast from 'react-hot-toast';
import './ContentPages.css';

const ContentPages: React.FC = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<ContentPage[]>([]);
  const [categories] = useState<ContentCategory[]>(mockContentCategories);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  
  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<ContentPage | null>(null);
  const [previewPage, setPreviewPage] = useState<ContentPage | null>(null);
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);
  const [user] = useState(null); // Add user state
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Load data
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setPages(mockContentPages);
      setFilteredPages(mockContentPages);
      setLoading(false);
    }, 500);
  }, []);

  // Filter pages
  useEffect(() => {
    let filtered = [...pages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        p.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Status filter
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(p => selectedStatus.includes(p.status));
    }

    setFilteredPages(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedStatus, pages]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);

  // Handlers
  const handleCreatePage = () => {
    setEditingPage(null);
    setIsEditorOpen(true);
  };

  const handleEditPage = (page: ContentPage) => {
    setEditingPage(page);
    setIsEditorOpen(true);
  };

  const handleViewPage = (page: ContentPage) => {
    setPreviewPage(page);
    setIsPreviewOpen(true);
  };

  const handleSavePage = (pageData: Omit<ContentPage, 'id' | 'views' | 'createdAt'>) => {
    if (editingPage) {
      // Update existing page
      const updatedPages = pages.map(p => 
        p.id === editingPage.id 
          ? { 
              ...p, 
              ...pageData, 
              updatedAt: new Date().toISOString(),
              version: p.version + 1
            } 
          : p
      );
      setPages(updatedPages);
      toast.success('Cập nhật trang thành công!');
    } else {
      // Create new page
      const newPage: ContentPage = {
        ...pageData,
        id: (pages.length + 1).toString(),
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: pageData.status === 'PUBLISHED' ? new Date().toISOString() : undefined
      };
      setPages([...pages, newPage]);
      toast.success('Tạo trang mới thành công!');
    }
    setIsEditorOpen(false);
    setEditingPage(null);
  };

  const handleDuplicatePage = (page: ContentPage) => {
    const newPage: ContentPage = {
      ...page,
      id: (pages.length + 1).toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'DRAFT',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: undefined,
      version: 1
    };
    setPages([...pages, newPage]);
    toast.success('Đã nhân bản trang!');
  };

  const handleDeleteClick = (pageId: string) => {
    setDeletingPageId(pageId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingPageId) {
      setPages(pages.filter(p => p.id !== deletingPageId));
      toast.success('Xóa trang thành công!');
      setIsDeleteModalOpen(false);
      setDeletingPageId(null);
    }
  };

  const handleStatusChange = (pageId: string, newStatus: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED') => {
    const updatedPages = pages.map(p => 
      p.id === pageId 
        ? { 
            ...p, 
            status: newStatus,
            updatedAt: new Date().toISOString(),
            publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : p.publishedAt
          } 
        : p
    );
    setPages(updatedPages);
    toast.success(`Đã chuyển trạng thái sang ${newStatus === 'PUBLISHED' ? 'đã xuất bản' : newStatus === 'DRAFT' ? 'bản nháp' : 'lưu trữ'}!`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatus([]);
  };

  return (
    <div className="content-pages">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Quản lý trang nội dung</h1>
          <p className="subtitle">Quản lý tất cả các trang, bài viết và nội dung tĩnh của website</p>
        </div>
        <button className="btn-primary" onClick={handleCreatePage}>
          + Tạo trang mới
        </button>
      </div>

      {/* Stats */}
      <ContentStats pages={pages} />

      {/* Filters and Search */}
      <div className="content-toolbar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tiêu đề, slug hoặc nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <ContentFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          Hiển thị {currentItems.length} / {filteredPages.length} trang
          {filteredPages.length !== pages.length && (
            <button className="reset-filters" onClick={handleClearFilters}>
              Xóa bộ lọc
            </button>
          )}
        </span>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <ContentTable
            pages={currentItems}
            onEdit={handleEditPage}
            onDelete={handleDeleteClick}
            onDuplicate={handleDuplicatePage}
            onView={handleViewPage}
            onStatusChange={handleStatusChange}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                ← Trước
              </button>
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    className={`page-number ${currentPage === number ? 'active' : ''}`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Sau →
              </button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {isEditorOpen && (
        <ContentEditor
          page={editingPage}
          categories={categories}
          onSave={handleSavePage}
          onCancel={() => {
            setIsEditorOpen(false);
            setEditingPage(null);
          }}
        />
      )}

      {previewPage && (
        <ContentPreview
          page={previewPage}
          onClose={() => {
            setIsPreviewOpen(false);
            setPreviewPage(null);
          }}
          onEdit={() => {
            setIsPreviewOpen(false);
            if (previewPage) {
              handleEditPage(previewPage);
            }
          }}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingPageId(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={pages.find(p => p.id === deletingPageId)?.title || ''}
        itemType="trang"
      />
    </div>
  );
};

export default ContentPages;