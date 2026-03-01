// src/pages/Documents/DocumentManagement.tsx
import React, { useState } from 'react';
import { mockDocuments } from '../../data/mockData';
import { Document } from '../../types';
import toast from 'react-hot-toast';
import './DocumentManagement.css';

const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteDocument = (docId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== docId));
      toast.success('Document deleted successfully!');
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    // Simulate download
    toast.success(`Downloading ${doc.name}...`);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return '📕';
      case 'DOCX': return '📘';
      case 'XLSX': return '📗';
      default: return '📄';
    }
  };

  return (
    <div className="document-management">
      <div className="page-header">
        <div>
          <h1>Document Management</h1>
          <p className="subtitle">System management and detailed overview.</p>
        </div>
        <button className="btn-primary">
          + Upload Document
        </button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="documents-list">
        <table className="data-table">
          <thead>
            <tr>
              <th>DOCUMENT NAME</th>
              <th>SIZE</th>
              <th>OWNER</th>
              <th>UPDATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map(doc => (
              <tr key={doc.id}>
                <td>
                  <div className="document-name">
                    <span className="file-icon">{getFileIcon(doc.type)}</span>
                    <div>
                      <div>{doc.name}</div>
                      <span className="file-type">{doc.type} File</span>
                    </div>
                  </div>
                </td>
                <td>{doc.size}</td>
                <td>{doc.owner}</td>
                <td>{doc.updatedAt}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="icon-btn" 
                      onClick={() => handleDownloadDocument(doc)}
                      title="Download"
                    >
                      ⬇️
                    </button>
                    <button 
                      className="icon-btn" 
                      onClick={() => handleDeleteDocument(doc.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManagement;