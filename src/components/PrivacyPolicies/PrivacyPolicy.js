import React from 'react';
import { Shield, Eye, Lock, Database, Users, Globe, Mail, Phone } from 'lucide-react';

function PrivacyPolicy() {
  const sectionStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(16, 185, 129, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(16, 185, 129, 0.1)',
    marginBottom: '2rem',
    overflow: 'hidden',
    position: 'relative'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    color: 'white',
    padding: '1.5rem 2rem',
    margin: '-1px -1px 0 -1px'
  };

  const iconBoxStyle = {
    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
  };

  const highlightBoxStyle = {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    borderLeft: '4px solid #10b981'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #d1fae5 75%, #f0fdf4 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            {/* Header Section */}
            <div style={sectionStyle}>
              <div style={headerStyle}>
                <div className="text-center">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div style={{
                      ...iconBoxStyle,
                      background: 'rgba(255, 255, 255, 0.2)',
                      marginRight: 0
                    }}>
                      <Shield size={24} color="white" />
                    </div>
                  </div>
                  <h1 className="h2 mb-3 font-weight-bold">Privacy Policy</h1>
                  <p className="mb-0 lead">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                  </p>
                  <small className="d-block mt-2 opacity-75">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </small>
                </div>
              </div>
            </div>

            {/* Quick Overview */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div style={iconBoxStyle}>
                    <Eye size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Quick Overview</h3>
                </div>
                <div style={highlightBoxStyle}>
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h6 className="font-weight-bold text-success mb-2">✓ We Collect</h6>
                      <ul className="list-unstyled small text-muted mb-0">
                        <li>• Account information</li>
                        <li>• Usage data</li>
                        <li>• Device information</li>
                        <li>• Communication data</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="font-weight-bold text-success mb-2">✓ We Don't</h6>
                      <ul className="list-unstyled small text-muted mb-0">
                        <li>• Sell your personal data</li>
                        <li>• Share without permission</li>
                        <li>• Store payment details</li>
                        <li>• Track unnecessarily</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Database size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Information We Collect</h3>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div style={highlightBoxStyle}>
                      <h5 className="font-weight-bold text-success mb-2">Personal Information</h5>
                      <ul className="text-muted mb-0">
                        <li>Name and email address</li>
                        <li>Profile information</li>
                        <li>Account preferences</li>
                        <li>Communication history</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div style={highlightBoxStyle}>
                      <h5 className="font-weight-bold text-success mb-2">Usage Information</h5>
                      <ul className="text-muted mb-0">
                        <li>How you use our services</li>
                        <li>Features you access</li>
                        <li>Time spent on platform</li>
                        <li>Interaction patterns</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div style={highlightBoxStyle}>
                      <h5 className="font-weight-bold text-success mb-2">Technical Information</h5>
                      <ul className="text-muted mb-0">
                        <li>Device type and OS</li>
                        <li>Browser information</li>
                        <li>IP address and location</li>
                        <li>Cookies and similar technologies</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div style={highlightBoxStyle}>
                      <h5 className="font-weight-bold text-success mb-2">Content Information</h5>
                      <ul className="text-muted mb-0">
                        <li>Posts and comments</li>
                        <li>Messages and communications</li>
                        <li>Files and uploads</li>
                        <li>Feedback and reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Users size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">How We Use Your Information</h3>
                </div>

                <div className="row">
                  <div className="col-12 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                      borderColor: '#f59e0b',
                      borderLeftColor: '#f59e0b'
                    }}>
                      <h5 className="font-weight-bold text-warning mb-2">🎯 Service Provision</h5>
                      <p className="text-muted mb-0">
                        We use your information to provide, maintain, and improve our services, including personalizing your experience and ensuring platform security.
                      </p>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      borderColor: '#3b82f6',
                      borderLeftColor: '#3b82f6'
                    }}>
                      <h5 className="font-weight-bold text-primary mb-2">📧 Communication</h5>
                      <p className="text-muted mb-0">
                        We may contact you about service updates, security alerts, support issues, and promotional content (with your consent).
                      </p>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                      borderColor: '#8b5cf6',
                      borderLeftColor: '#8b5cf6'
                    }}>
                      <h5 className="font-weight-bold text-purple mb-2">📊 Analytics & Improvement</h5>
                      <p className="text-muted mb-0">
                        We analyze usage patterns to understand how our services are used and to develop new features and improvements.
                      </p>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                      borderColor: '#ef4444',
                      borderLeftColor: '#ef4444'
                    }}>
                      <h5 className="font-weight-bold text-danger mb-2">🛡️ Legal & Safety</h5>
                      <p className="text-muted mb-0">
                        We may use your information to comply with legal obligations, protect our rights, and ensure the safety of our community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Globe size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Information Sharing</h3>
                </div>

                <div style={highlightBoxStyle}>
                  <h5 className="font-weight-bold text-success mb-3">We may share your information in these limited circumstances:</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="badge badge-success mr-2 mt-1">1</span>
                        <div>
                          <h6 className="font-weight-bold mb-1">With Your Consent</h6>
                          <small className="text-muted">When you explicitly agree to share information with third parties.</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="badge badge-success mr-2 mt-1">2</span>
                        <div>
                          <h6 className="font-weight-bold mb-1">Service Providers</h6>
                          <small className="text-muted">Trusted partners who help us operate our platform securely.</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="badge badge-success mr-2 mt-1">3</span>
                        <div>
                          <h6 className="font-weight-bold mb-1">Legal Requirements</h6>
                          <small className="text-muted">When required by law or to protect rights and safety.</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="badge badge-success mr-2 mt-1">4</span>
                        <div>
                          <h6 className="font-weight-bold mb-1">Business Transfers</h6>
                          <small className="text-muted">In case of merger, acquisition, or business restructuring.</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Lock size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Data Security</h3>
                </div>

                <p className="text-muted mb-4">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure.
                </p>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="text-center p-3" style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '15px',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                      }}>
                        <Lock size={24} color="white" />
                      </div>
                      <h6 className="font-weight-bold text-success">Encryption</h6>
                      <small className="text-muted">Data encrypted in transit and at rest</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="text-center p-3" style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '15px',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                      }}>
                        <Shield size={24} color="white" />
                      </div>
                      <h6 className="font-weight-bold text-success">Access Control</h6>
                      <small className="text-muted">Limited access on need-to-know basis</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="text-center p-3" style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '15px',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                      }}>
                        <Database size={24} color="white" />
                      </div>
                      <h6 className="font-weight-bold text-success">Regular Audits</h6>
                      <small className="text-muted">Continuous security monitoring</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Users size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Your Privacy Rights</h3>
                </div>

                <p className="text-muted mb-4">
                  You have several rights regarding your personal information. Contact us to exercise these rights.
                </p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      borderColor: '#3b82f6',
                      borderLeftColor: '#3b82f6'
                    }}>
                      <h6 className="font-weight-bold text-primary mb-2">📋 Access & Portability</h6>
                      <small className="text-muted">Request a copy of your personal data in a portable format.</small>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                      borderColor: '#f59e0b',
                      borderLeftColor: '#f59e0b'
                    }}>
                      <h6 className="font-weight-bold text-warning mb-2">✏️ Correction</h6>
                      <small className="text-muted">Update or correct inaccurate personal information.</small>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                      borderColor: '#ef4444',
                      borderLeftColor: '#ef4444'
                    }}>
                      <h6 className="font-weight-bold text-danger mb-2">🗑️ Deletion</h6>
                      <small className="text-muted">Request deletion of your personal data (right to be forgotten).</small>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div style={{
                      ...highlightBoxStyle,
                      background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                      borderColor: '#8b5cf6',
                      borderLeftColor: '#8b5cf6'
                    }}>
                      <h6 className="font-weight-bold" style={{ color: '#8b5cf6' }}>⛔ Object/Restrict</h6>
                      <small className="text-muted">Object to or restrict certain processing of your data.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Globe size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Cookies & Tracking</h3>
                </div>

                <div style={highlightBoxStyle}>
                  <p className="text-muted mb-3">
                    We use cookies and similar technologies to enhance your experience and analyze platform usage.
                  </p>

                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="font-weight-bold text-success mb-2">Essential Cookies</h6>
                      <ul className="list-unstyled text-muted small mb-3">
                        <li>• Authentication and security</li>
                        <li>• Basic platform functionality</li>
                        <li>• User preferences</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="font-weight-bold text-info mb-2">Analytics Cookies</h6>
                      <ul className="list-unstyled text-muted small mb-3">
                        <li>• Usage patterns and statistics</li>
                        <li>• Performance optimization</li>
                        <li>• Feature improvement insights</li>
                      </ul>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <small>
                      <strong>Cookie Control:</strong> You can manage cookie preferences through your browser settings.
                      Note that disabling essential cookies may impact platform functionality.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div style={iconBoxStyle}>
                    <Shield size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Children's Privacy</h3>
                </div>

                <div style={{
                  ...highlightBoxStyle,
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                  borderColor: '#ef4444',
                  borderLeftColor: '#ef4444'
                }}>
                  <p className="text-muted mb-2">
                    Our services are not intended for children under 13. We do not knowingly collect personal information
                    from children under 13. If you believe we have collected information from a child under 13,
                    please contact us immediately.
                  </p>
                  <small className="text-danger font-weight-bold">
                    Age Requirement: 13+ years old
                  </small>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div style={iconBoxStyle}>
                    <Mail size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Contact Us</h3>
                </div>

                <p className="text-muted mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3" style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <Mail size={20} className="text-success mr-3" />
                      <div>
                        <h6 className="mb-0 font-weight-bold">Email</h6>
                        <small className="text-muted">privacy@skillhub.com</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3" style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <Phone size={20} className="text-success mr-3" />
                      <div>
                        <h6 className="mb-0 font-weight-bold">Support</h6>
                        <small className="text-muted">support@skillhub.com</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  ...highlightBoxStyle,
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  borderColor: '#f59e0b',
                  borderLeftColor: '#f59e0b'
                }}>
                  <h6 className="font-weight-bold text-warning mb-2">Response Time</h6>
                  <p className="text-muted mb-0">
                    We typically respond to privacy-related inquiries within 30 days. For urgent matters,
                    please mark your message as "URGENT - Privacy Request".
                  </p>
                </div>
              </div>
            </div>

            {/* Changes to Policy */}
            <div style={sectionStyle}>
              <div className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div style={iconBoxStyle}>
                    <Globe size={20} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="mb-0 font-weight-bold text-dark">Policy Updates</h3>
                </div>

                <div style={highlightBoxStyle}>
                  <p className="text-muted mb-3">
                    We may update this Privacy Policy from time to time to reflect changes in our practices,
                    technology, legal requirements, or for other operational reasons.
                  </p>

                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="badge badge-success mr-2">✓</span>
                        <small className="text-muted">30-day notice for major changes</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="badge badge-success mr-2">✓</span>
                        <small className="text-muted">Email notifications to users</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="badge badge-success mr-2">✓</span>
                        <small className="text-muted">Updated date clearly marked</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="badge badge-success mr-2">✓</span>
                        <small className="text-muted">Previous versions available</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 253, 244, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(16, 185, 129, 0.1)'
              }}>
                <p className="text-muted mb-2">
                  Thank you for trusting us with your information. Your privacy matters to us.
                </p>
                <small className="text-muted">
                  This policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and applies to all users of our platform.
                </small>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;